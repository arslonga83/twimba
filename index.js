import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

 document.addEventListener('click', (e) => {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    } else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    } else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    } else if (e.target.id === 'tweet-btn') {
        handleTweetBtnClick()
    } else if (e.target.dataset.replybtn) {
        handleReplyBtnClick(e.target.dataset.replybtn)
    } else if (e.target.dataset.trash) {
        handleTrashClick(e.target.dataset.trash)
    } else if (e.target.id === 'reset') {
        resetStorage()
    }
 })

//check for localstorage or use data.js for initial feed
let tweetsHistory = {}
    if (localStorage.getItem('tweetsHistory')) {
        tweetsHistory = JSON.parse(localStorage.getItem('tweetsHistory'))
    } else {
        tweetsHistory = tweetsData;
    }

function storeData() {
    localStorage.setItem('tweetsHistory', JSON.stringify(tweetsHistory))
    }

function resetStorage() {
    localStorage.clear();
    location.reload();
}

 function handleLikeClick(tweetId) {
        const targetTweetObj = tweetsHistory.filter((tweet) => {
            return tweet.uuid === tweetId;
        })[0]
        if (!targetTweetObj.isLiked) {
            targetTweetObj.likes++;
        } else {
            targetTweetObj.likes--; 
        }
        targetTweetObj.isLiked = !targetTweetObj.isLiked;
        render();  
        storeData();
 }

 function handleRetweetClick(tweetId) {
    const targetTweetObj = tweetsHistory.filter((tweet) => {
        return tweet.uuid === tweetId;
    })[0]
    if (!targetTweetObj.isRetweeted) {
        targetTweetObj.retweets++
    } else {
        targetTweetObj.retweets--
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
    render();
    storeData();
 }

 function handleReplyClick(replyId) {
    document.querySelector(`#replies-${replyId}`).classList.toggle('hidden');
 }

 function handleTweetBtnClick() {
    const tweetInput = document.querySelector('#tweet-input');

    if (tweetInput.value) {
        tweetsHistory.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: `${tweetInput.value}`,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
        })
        render()
        storeData();
        tweetInput.value = '';
    }
 }

 function handleReplyBtnClick(tweetId) {
    const replyText = document.querySelector(`#reply-input-${tweetId}`)
    const targetTweetObj = tweetsHistory.filter((tweet) => {
        return tweet.uuid === tweetId;
    })[0]
    
    if (replyText.value) {
        targetTweetObj.replies.push(
        {
            handle: "@Scrimba",
            profilePic: "images/scrimbalogo.png",
            tweetText: replyText.value,
        }
        )
        render();
        storeData();
        handleReplyClick(tweetId) //keep replies visible
        replyText.value = '';
    }
 }

 function handleTrashClick(tweetId) {
    tweetsHistory = tweetsHistory.filter((tweet) => {
        return tweet.uuid != tweetId;
    })
    render()
    storeData()
 }

function getFeedHtml(){
    let feedHtml = '';
    tweetsHistory.forEach((tweet) => {

        let likeIconStyle = '';
        if(tweet.isLiked) {
            likeIconStyle = 'color:red'
        }

        let retweetedIconStyle
        if(tweet.isRetweeted) {
            retweetedIconStyle = 'color: limegreen'
        }

        let repliesHtml = '';
        if (tweet.replies.length > 0) {
          tweet.replies.forEach((reply) => {
            repliesHtml += `
            <div class="tweet-reply">
              <div class="tweet-inner">
                  <img src="${reply.profilePic}" class="profile-pic">
                  <div>
                      <p class="handle">${reply.handle}</p>
                      <p class="tweet-text">${reply.tweetText}</p>
                  </div>
              </div>
            </div>
            `
          })
        }

        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
            <i class="fa fa-trash" aria-hidden="true" data-trash="${tweet.uuid}"></i>
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                        <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                        <i class="fa-solid fa-heart" style="${likeIconStyle}" data-like="${tweet.uuid}"></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                        <i class="fa-solid fa-retweet" style="${retweetedIconStyle}"data-retweet="${tweet.uuid}"></i>
                            ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
            <div class="hidden" id="replies-${tweet.uuid}">
                ${repliesHtml}
                <div class="reply-input-area">
			        <img src="images/scrimbalogo.png" class="profile-pic">
			        <textarea placeholder="Reply..." id="reply-input-${tweet.uuid}"></textarea>
		        </div>
                <button id="reply-btn-${tweet.uuid}" class="reply-btn" data-replybtn="${tweet.uuid}">Reply</button>
            </div>   
        </div>
        `
    })
    return feedHtml;
}

function render() {
    document.querySelector('#feed').innerHTML = getFeedHtml()
}
    
render()
  
    