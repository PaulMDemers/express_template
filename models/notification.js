'use strict';
var AWS = require("aws-sdk");
AWS.config.update(
    {
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    }
);

let platformArnMap = {
    'iOS_Sandbox' : process.env.SNS_IOS_SANDBOX_ARN,
    'iOS' : process.env.SNS_IOS_ARN,
    'Android' : process.env.SNS_ANDROID_ARN,
}

var sns = new AWS.SNS();

var util = require('../utils');
var pool = util.Pool;

//DeviceTokens - Table Structure
//User, varchar(64)
//Token, varchar(256)
//Platform, varchar(45)

class Notification {
    static async AddToken(userId, deviceToken, platform) {
        try
        {
            var params = {
                PlatformApplicationArn: platformArnMap[platform],
                Token: deviceToken
            };
            var cpeRes = await sns.createPlatformEndpoint(params).promise();
            
            await pool.execute("REPLACE INTO DeviceTokens (User, Token, Platform) VALUES (?,?,?)", [userId, cpeRes.EndpointArn, platform ]);
        }
        catch(err){
            console.log("ADD TOKEN ERR");
            console.log(err);

        } //Suppress
    }

    static async GetAllEndpoints(userId) {
        let [resData] = await pool.execute("SELECT * FROM DeviceTokens WHERE User=?", [userId]);
        let tokens = [];
        
        for(let a = 0; a < resData.length; a++) {
            tokens.push({
                token : resData[a].Token,
                platform: resData[a].Platform
            });
        }
        
        return tokens;
    }

    static async Send(targetUserId, message) {
        let devices = await Notification.GetAllEndpoints(targetUserId);
        
        for(let a = 0; a < devices.length; a++) {

            if(devices[a].platform == 'BOT') {
                //invoke step function
            } else {
                try {
                    var params = {
                        Message: message,
                        TargetArn: devices[a].token
                    };
                    
                    let pubRes = await sns.publish(params).promise();
                }
                catch(snsEx) {
                    await pool.execute("DELETE FROM DeviceTokens WHERE Token=?", [devices[a].token]);

                    //console.log("snsEx");
                    //console.log(snsEx);
                }
            }
        }
    }
}

module.exports = Notification;