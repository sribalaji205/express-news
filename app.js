const express = require('express');
const axios = require('axios');
const app = express();
const urlMetadata = require('url-metadata');


app.set('view engine', 'ejs');
app.use(express.static("public"));
var topStory = [];
var newStory = [];
var bestStory = [];

var topimage = [];
var newimage = [];
var bestimage = [];

var topstory;
var beststory;
var newstory;
//var start = new Date();


app.get('/', function(req, res) {
    res.render('template', { stories: [1], images: [1] });
})
app.get('/topstories', async function(req, res) {

    if (topStory.length == 0 || topStory.length < topstory) {
        topStory = [];
        topimage = [];
        console.log("Top Stories Fetching");
        await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
            .then(async function(response) {
                //console.log(response.data.length);
                topstory = response.data.length;
                for (var i = 0; i < response.data.length; i++) {
                    var id = response.data[i];
                    await axios.get('https://hacker-news.firebaseio.com/v0/item/' + id + '.json?print=pretty').then(async function(response) {
                        topStory.push(response.data);
                        //console.log(response.data.url);
                        if (response.data.url != undefined) {
                            await urlMetadata(response.data.url).then(function(response) {
                                    topimage.push(response.image);
                                },
                                function(error) {
                                    //console.log(error);
                                    topimage.push("");
                                }
                            )
                        } else {
                            topimage.push("");
                        }
                    }).catch(function(e) {
                        if (e.response)
                            topStory.push({});
                        //console.log(e);
                    });

                }
            }).catch(function(e) {
                //console.log(e);
                alert("Error Try Again..");
            });
        //console.log(topStory);
        //console.log(topimage);
        res.render('template', { stories: topStory, images: topimage });
    } else {
        //console.log(topStory);
        //console.log(topimage);
        console.log
        res.render('template', { stories: topStory, images: topimage });

    }
    //res.render('template', { result: Story });
    //console.log('Request took:', new Date() - start, 'ms');

})
app.get('/newstories', async function(req, res) {

    if (newStory.length == 0 || newStory.length < newstory) {
        newStory = [];
        newimage = [];
        console.log("New Stories Fetching");
        await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
            .then(async function(response) {
                //console.log(response.data.length);
                newstory = response.data.length;
                for (var i = 0; i < response.data.length; i++) {
                    var id = response.data[i];
                    await axios.get('https://hacker-news.firebaseio.com/v0/item/' + id + '.json?print=pretty').then(async function(response) {
                        newStory.push(response.data);
                        //console.log(response.data.url);
                        if (response.data.url != undefined) {
                            await urlMetadata(response.data.url).then(function(response) {
                                    newimage.push(response.image);
                                },
                                function(error) {
                                    //console.log(error);
                                    newimage.push("");
                                }
                            )
                        } else {
                            newimage.push("");
                        }
                    }).catch(function(e) {
                        if (e.response)
                            newStory.push({});
                        //console.log(e);
                    });

                }
            }).catch(function(e) {
                //console.log(e);
                alert("Error Try Again..");
            });
        // console.log(newStory);
        // console.log(newimage);
        res.render('template', { stories: newStory, images: newimage });
    } else {
        // console.log(newStory);
        // console.log(newimage);
        res.render('template', { stories: newStory, images: newimage });

    }
    //res.render('template', { result: Story });
    //console.log('Request took:', new Date() - start, 'ms');

})
app.get('/beststories', async function(req, res) {

    if (bestStory.length == 0 || bestStory.length < beststory) {
        bestStory = [];
        bestimage = [];
        console.log("Best Stories Fetching");
        await axios.get('https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty')
            .then(async function(response) {
                //console.log(response.data.length);
                beststory = response.data.length;
                for (var i = 0; i < response.data.length; i++) {
                    var id = response.data[i];
                    await axios.get('https://hacker-news.firebaseio.com/v0/item/' + id + '.json?print=pretty').then(async function(response) {
                        bestStory.push(response.data);
                        //console.log(response.data.url);
                        if (response.data.url != undefined) {
                            await urlMetadata(response.data.url).then(function(response) {
                                    bestimage.push(response.image);
                                },
                                function(error) {
                                    //console.log(error);
                                    bestimage.push("");
                                }
                            )
                        } else {
                            bestimage.push("");
                        }
                    }).catch(function(e) {
                        if (e.response)
                            bestStory.push({});
                        //console.log(e);
                    });

                }
            }).catch(function(e) {
                //console.log(e);
                alert("Error Try Again..");
            });
        //console.log(bestStory);
        //console.log(bestimage);
        res.render('template', { stories: bestStory, images: bestimage });
    } else {
        //console.log(bestStory);
        //console.log(bestimage);
        res.render('template', { stories: bestStory, images: bestimage });

    }
    //res.render('template', { result: Story });
    //console.log('Request took:', new Date() - start, 'ms');

})
const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
    console.log('Server running on %s', PORT);
});