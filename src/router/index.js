import Vue from 'vue'
import Router from 'vue-router'
/* 共用按钮 */
import backMain from '@/components/common/back'
import goMall from '@/components/common/mall'
import pageControl from '@/components/common/pageControl'
import nextCourse from '@/components/common/nextCourse'
import Carousel3d from '@/components/common/Carousel3d'
import Slide from '@/components/common/Slide'
import vodal from '@/components/common/vodal'
import backgroundSnd from '@/components/common/backgroundSnd'
/* 主界面 */
import main from '@/components/main'
/* 三个模块 */
import set from '@/components/Module/set'
import buy from '@/components/Module/buy'
import play from '@/components/Module/play'
/* 四个岛 */
import adventure from '@/components/Module/playScene/adventure'
import erudite from '@/components/Module/playScene/erudite'
import knowledge from '@/components/Module/playScene/knowledge'
import wealth from '@/components/Module/playScene/wealth'
/* 课件资源 */
import showStory from '@/components/Module/playScene/source/showStory'
import showCourse from '@/components/Module/playScene/source/showCourse'
import showGame from '@/components/Module/playScene/source/showGame'
import dragCourse from '@/components/Module/playScene/source/dragCourse'
import clickRect from '@/components/Module/playScene/source/clickRect'
import clickRect2 from '@/components/Module/playScene/source/clickRect2'
import drawRect from '@/components/Module/playScene/source/drawRect'
import adventureDrag1 from '@/components/Module/playScene/source/adventureDrag1'
import adventureDrag2 from '@/components/Module/playScene/source/adventureDrag2'
import adventureColor from '@/components/Module/playScene/source/adventureColor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/',
      name: 'backMain',
      component: backMain
    },
    {
      path: '/',
      name: 'Carousel3d',
      component: Carousel3d
    },
    {
      path: '/',
      name: 'Slide',
      component: Slide
    },
    {
      path: '/',
      name: 'vodal',
      component: vodal
    },
    {
      path: '/',
      name: 'backgroundSnd',
      component: backgroundSnd
    },
    {
      path: '/',
      name: 'nextCourse',
      component: nextCourse
    },
    {
      path: '/',
      name: 'goMall',
      component: goMall
    },
    {
      path: '/',
      name: 'pageControl',
      component: pageControl
    },
    {
      path: '/set',
      name: 'set',
      component: set
    },
    {
      path: '/buy',
      name: 'buy',
      component: buy
    },
    {
      path: '/play',
      name: 'play',
      component: play
    },
    {
      path: '/play/adventure',
      name: 'adventure',
      component: adventure
    },
    {
      path: '/play/erudite',
      name: 'erudite',
      component: erudite
    },
    {
      path: '/play/knowledge',
      name: 'knowledge',
      component: knowledge
    },
    {
      path: '/play/wealth',
      name: 'wealth',
      component: wealth
    },
    {
      path: '/play/knowledge/showStory',
      name: 'showStory',
      component: showStory
    },
    {
      path: '/play/adventure/showStory',
      name: 'showStory2',
      component: showStory
    },
    {
      path: '/play/wealthshowCourse',
      name: 'showCourse',
      component: showCourse
    },
    {
      path: '/play/knowledge/showGame',
      name: 'showGame',
      component: showGame
    },
    {
      path: '/play/knowledge/dragCourse',
      name: 'dragCourse',
      component: dragCourse
    },
    {
      path: '/play/knowledge/clickRect',
      name: 'clickRect',
      component: clickRect
    },
    {
      path: '/play/knowledge/clickRect2',
      name: 'clickRect2',
      component: clickRect2
    },
    {
      path: '/play/knowledge/drawRect',
      name: 'drawRect',
      component: drawRect
    },
    {
      path: '/play/adventure/adventureDrag1',
      name: 'adventureDrag1',
      component: adventureDrag1
    },
    {
      path: '/play/adventure/adventureDrag2',
      name: 'adventureDrag2',
      component: adventureDrag2
    },
    {
      path: '/play/adventure/adventureColor',
      name: 'adventureColor',
      component: adventureColor
    }
  ]
})
