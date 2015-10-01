let stubs = [];

stubs["channels"] = {
  "meta": {
  },
  "data": [
    {
      "type": "channels",
      "id": "1",
      "attributes": {
        "description": "Gaming Podcast",
        "title": "The Attack",
        "thumbnailUrl": "http://static-cdn.jtvnw.net/jtv_user_pictures/theattack-profile_image-b20434576855d939-300x300.png",
        "tags": ["gaming", "podcast"]
      },
      "relationships": {
        "shows": {
          "data": [
            { "type": "shows", "id": "1" }
          ]
        }
      }
    }
  ]
};

stubs["shows"] = {
  "meta": {
  },
  "data": [
    {
      "type": "shows",
      "id": "1",
      "attributes": {
        "description": "Billy Mays' new series on how to be a straight pimp.",
        "title": "How to Sell Your Soul",
        "presenter": "Billy Mays",
        "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Billy_Mays_headshot.jpg"
      },
      "relationships": {
        "channels": {
          "links": {
            "self": "/api/shows/1/relationships/channels",
            "related": "/api/shows/1/channels"
          },
          "data": [
            {
              "type": "channels",
              "id": "1"
            }
          ]
        },
        "presenters": {
          "links": {
            "self": "/api/shows/1/relationships/presenters",
            "related": "/api/shows/1/presenters"
          },
          "data": [
            {
              "type": "presenters",
              "id": "1"
            }
          ]
        },
        "chapters": {
          "links": {
            "self": "/api/shows/1/relationships/chapters",
            "related": "/api/shows/1/chapters"
          },
          "data": [
            {
              "type": "chapters",
              "id": "1"
            }
          ]
        },
        "slides": {
          "links": {
            "self": "/api/shows/1/relationships/slides",
            "related": "/api/shows/1/slides"
          },
          "data": [
            {
              "type": "slides",
              "id": "1"
            }
          ]
        },
        "events": {
          "links": {
            "self": "/api/shows/1/relationships/events",
            "related": "/api/shows/1/events"
          },
          "data": [
            {
              "type": "events",
              "id": "1"
            }
          ]
        },
        "videos": {
          "links": {
            "self": "/api/shows/1/relationships/videos",
            "related": "/api/shows/1/videos"
          },
          "data": [
            {
              "type": "videos",
              "id": "1"
            }
          ]
        },
        "assessments": {
          "links": {
            "self": "/api/shows/1/relationships/assessments",
            "related": "/api/shows/1/assessments"
          },
          "data": [
            {
              "type": "assessments",
              "id": "1"
            }
          ]
        },
      }
    }
  ]
};

stubs["chapters"] = {
  "meta": {},
  "data": [
      {
        "id": "1",
        "type": "chapters",
        "attributes": {
          "title": "Keep the Pimp Hand Strong",
          "body": "As a young man, Billy Mays had to endure the cold and dangerous streets of Chicago in the 1960s. An entrepreneur from an early age, Billy scored his first crack rock at the age of 8. He cut the rock with powdered bleach and doubled up."
        },
        "relationships": {
          "shows": {
            "data": [
              { "type": "shows", "id": "1" }
            ]
          }
        }
      }
    ]
};

stubs["slides"] = {
  "meta": {},
  "data": [
    {
      "id": "1",
      "type": "slides",
      "attributes": {
        "title": "Telltale signs of A Narc",
        "alt": "Billy has never been arrested",
        "src": "http://cloudfront.aws.com/narc_800x600.jpg"
      },
      "relationships": {
        "shows": {
          "data": [
            { "type": "shows", "id": "1" }
          ]
        }
      }
    }, {
      "id": "2",
      "type": "slides",
      "attributes": {
        "title": "How To Hide A Body",
        "alt": "They Can't Snitch if They're Dead",
        "src": "http://cloudfront.aws.com/deadsnitch_800x600.jpg"
      },
      "relationships": {
        "shows": {
          "data": [
            { "type": "shows", "id": "1" }
          ]
        }
      }
    }
  ]
};

stubs["events"] = {
  "meta": {},
  "data": [
    {
      "id": "1",
      "type": "events",
      "attributes": {
        "eventType": "showVideo",
        "params": '{ "videoId": 2, "isModal": true, "closeOnExit": true }',
        "startTime": "00:10"
      },
      "relationships": {
        "shows": {
          "data": [
            { "type": "shows", "id": "1" }
          ]
        }
      }
    }, {
      "id": "2",
      "type": "events",
      "attributes": {
        "eventType": "showAssessment",
        "params": '{ "assessmentId": 1, "container": "slideShowContainer", "pausePrimaryVideo": true }'
      },
      "relationships": {
        "shows": {
          "data": [
            { "type": "shows", "id": "1" }
          ]
        }
      }
    }]
};

stubs["videos"] = {
  "meta": {},
  "data": [
    {
      "id": "1",
      "type": "videos",
      "attributes": {
        "title": "Billy Mays Introduction",
        "description": "Get to know the king of pimps",
        "src": "http://video-js.zencoder.com/oceans-clip.mp4",
        "mimeType": "video/mp4"
      },
      "relationships": {
        "shows": {
          "data": [
            { "type": "shows", "id": "1" }
          ]
        }
      }
    }
  ]
};

stubs["presenters"] = {
  "meta": {},
  "data": [{
    "id": "1",
    "type": "presenters",
    "attributes": {
      "name": "Billy",
      "bio": "Sickest son of a bitch east of the Mississippi."
    },
      "relationships": {
        "shows": {
          "data": [
            { "type": "shows", "id": "1" }
          ]
        }
      }
  }]
};

stubs["assessments"] = {
  "meta": {},
  "data": [{
    "id": "1",
    "type": "assessments",
    "attributes": {
      "title": "Narc Test",
      "questions": [1],
      "results": [99],
      "scoreType": "passfail",
      "scoreThresholdPct": 70,
      "maxAttempts": 2
    },
    "relationships": {
      "questions": {
        "data": {
          "id": "1",
          "type": "questions"
        }
      }
    }
  }]
};

stubs["questions"] = {
  "meta": {},
  "data": [{
    "id": "1",
    "type": "questions",
    "attributes": {
      "prompt": "Will you ride til you die?",
      "inputType": "text",
      "value": 33.33
    }
  }]
};

export default stubs;