// @ts-check
var Twit = require('twit');
const gql = require("../database/query");

function twitter () {
    console.log("Listening for tweets hashtag => #citizensapp");

    var T = new Twit({
        consumer_key:         "8NO0gW8xzzHT4WUIcGfIZ2OW5",
        consumer_secret:      "sAdUBjZFdH18Nt4j26gkLbDGd7GkTp7WlTZyaQkI4873WvCnYZ",
        access_token:         "1114549401475633152-mWUjARjPA0FL6yfchcTxd9Es5c8n87",
        access_token_secret:  "TjOK9jTyXT4KRnEvLUxyxxJZoTwO9iYOAvqIygMCNGUlA",
        timeout_ms:           60*1000,
        strictSSL:            true,
    });

    var stream = T.stream('statuses/filter', { track: '#citizensapp' });
    // console.log(stream)
    stream.on('tweet', function (tweet) {
        var info = {
            origin: tweet.created_at,
            email: tweet.text.match(/^Email\:(.)*$/gm)[0].split(":")[1],
            department: tweet.text.match(/^Department\:(.)*$/gm)[0].split(":")[1],
            description: tweet.text.match(/^Description\:(.)*$/gm)[0].split(":")[1],
            area: tweet.text.match(/^Area\:(.)*$/gm)[0].split(":")[1],
            title: tweet.text.match(/^Title\:(.)*$/gm)[0].split(":")[1]
        };

        let func = async () => {
            let data = await cacheTweet(info);
            // console.log(data);
        }
        func()
    });
}

function cacheTweet(tweetInfo) {
    // console.log(tweetInfo)
    return new Promise(async (resolve, reject) => {
        if (tweetInfo.origin && tweetInfo.description && tweetInfo.area && tweetInfo.department && tweetInfo.email && tweetInfo.title) {
            
            // user -> unknown
            var cid = 0;
            
            var aid = 0;
            var image_url = '';
            var res = await gql.insertProblem(aid, tweetInfo.department, image_url, tweetInfo.description, tweetInfo.title, cid);
            // console.log(res)
            resolve("Tweet Inserted in DB");
        } else {
            reject("Invalid Tweet !");
        }
    });
}

twitter();
