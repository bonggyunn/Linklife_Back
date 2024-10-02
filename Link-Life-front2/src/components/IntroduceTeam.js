import React from 'react'
import "../App.css"
import picture_hyewon from '../images/hye-won.jpg';
import picture_hoon from '../images/hoon.jpg';
import picture_bonggyun from '../images/bong-gyun.jpg';
import picture_kanghui from '../images/kang-hui.jpg';
import logo_linklife from '../images/logo_Link-Life(2).png';

const IntroduceTeam = () => {
  return (
    <>
        <div className='it-body'>
            <div class="it-wrapper">
                 <div class="it-outer">
                     <div class="it-card card1" >
                        <div class="it-content">
                        <div class="it-img"><img src={logo_linklife} alt=""/></div>
                        <div class="it-details">
                            <span class="it-name">KEYRING</span>
                            <p>Timeline Sharing Platform</p>
                        </div>
                        </div>
                        <a href="#">Follow</a>
                    </div>
                    <div class="it-card card2" >
                        <div class="it-content">
                        <div class="it-img"><img src={picture_hyewon} alt=""/></div>
                        <div class="it-details">
                            <span class="it-name">우혜원</span>
                            <p>Frontend Developer, Team Leader</p>
                        </div>
                        </div>
                        <a href="#">Follow</a>
                    </div>
                    <div class="it-card card3" >
                        <div class="it-content">
                        <div class="it-img"><img src={picture_hoon} alt=""/></div>
                        <div class="it-details">
                            <span class="it-name">차훈</span>
                            <p>Frontend Developer</p>
                        </div>
                        </div>
                        <a href="#">Follow</a>
                    </div>
                    <div class="it-card card4" >
                        <div class="it-content">
                        <div class="it-img"><img src={picture_bonggyun} alt=""/></div>
                        <div class="it-details">
                            <span class="it-name">우봉균</span>
                            <p>Backend Developer</p>
                        </div>
                        </div>
                        <a href="#">Follow</a>
                    </div>
                    <div class="it-card card5" >
                        <div class="it-content">
                        <div class="it-img"><img src={picture_kanghui} alt=""/></div>
                        <div class="it-details">
                            <span class="it-name">고강희</span>
                            <p>Backend Developer</p>
                        </div>
                        </div>
                        <a href="#">Follow</a>
                    </div>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default IntroduceTeam
