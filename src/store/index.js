import Vue from 'vue'
import Vuex from 'Vuex'
import {mapState} from 'vuex'

Vue.use(Vuex)

/* 数据管理 */
const state = {
  count: 1,
  /* 金币 */
  gold: 0,
  /* 回答正确数 */
  rightAnswerNum: 0,
  /* 记录路由跳转层级 */
  routeRate: 1,
  /* 记录背景音乐的位置 */
  bgSndPosition: 0,
  /* 记录是否登录 */
  isLoaded: false,
  /* 题库数据 */
  exercisesBank: [
    {
      index: 1,
      isCheck: false,
      isRight: false,
      question: '图中有多少个长方形？',
      picPath: '../../static/img/wealthPic/question01.png',
      rightAnswer: 1,
      option: [{'index': 1, 'answer': 1}, {'index': 2, 'answer': 2}, {'index': 3, 'answer': 3}, {'index': 4, 'answer': 4}]
    },
    {
      index: 2,
      isCheck: false,
      isRight: false,
      question: '图中有多少个长方形2？',
      picPath: '../../static/img/wealthPic/question01.png',
      rightAnswer: 2,
      option: [{'index': 1, 'answer': 1}, {'index': 2, 'answer': 2}, {'index': 3, 'answer': 3}, {'index': 4, 'answer': 4}]
    },
    {
      index: 3,
      isCheck: false,
      isRight: false,
      question: '图中有多少个长方形3？',
      picPath: '../../static/img/wealthPic/question01.png',
      rightAnswer: 3,
      option: [{'index': 1, 'answer': 1}, {'index': 2, 'answer': 2}, {'index': 3, 'answer': 3}, {'index': 4, 'answer': 4}]
    },
    {
      index: 4,
      isCheck: false,
      isRight: false,
      question: '图中有多少个长方形4？',
      picPath: '../../static/img/wealthPic/question01.png',
      rightAnswer: 4,
      option: [{'index': 1, 'answer': 1}, {'index': 2, 'answer': 2}, {'index': 3, 'answer': 3}, {'index': 4, 'answer': 4}]
    },
    {
      index: 5,
      isCheck: false,
      isRight: false,
      question: '图中有多少个长方形5？',
      picPath: '../../static/img/wealthPic/question01.png',
      rightAnswer: 1,
      option: [{'index': 1, 'answer': 1}, {'index': 2, 'answer': 2}, {'index': 3, 'answer': 3}, {'index': 4, 'answer': 4}]
    },
    {
      index: 6,
      isCheck: false,
      isRight: false,
      question: '图中有多少个长方形6？',
      picPath: '../../static/img/wealthPic/question01.png',
      rightAnswer: 2,
      option: [{'index': 1, 'answer': 1}, {'index': 2, 'answer': 2}, {'index': 3, 'answer': 3}, {'index': 4, 'answer': 4}]
    },
    {
      index: 7,
      isCheck: false,
      isRight: false,
      question: '图中有多少个长方形7？',
      picPath: '../../static/img/wealthPic/question01.png',
      rightAnswer: 3,
      option: [{'index': 1, 'answer': 1}, {'index': 2, 'answer': 2}, {'index': 3, 'answer': 3}, {'index': 4, 'answer': 4}]
    },
    {
      index: 8,
      isCheck: false,
      isRight: false,
      question: '图中有多少个长方形8？',
      picPath: '../../static/img/wealthPic/question01.png',
      rightAnswer: 4,
      option: [{'index': 1, 'answer': 1}, {'index': 2, 'answer': 2}, {'index': 3, 'answer': 3}, {'index': 4, 'answer': 4}]
    },
    {
      index: 9,
      isCheck: false,
      isRight: false,
      question: '图中有多少个长方形9？',
      picPath: '../../static/img/wealthPic/question01.png',
      rightAnswer: 1,
      option: [{'index': 1, 'answer': 1}, {'index': 2, 'answer': 2}, {'index': 3, 'answer': 3}, {'index': 4, 'answer': 4}]
    },
    {
      index: 10,
      isCheck: false,
      isRight: false,
      question: '图中有多少个长方形10？',
      picPath: '../../static/img/wealthPic/question01.png',
      rightAnswer: 2,
      option: [{'index': 1, 'answer': 1}, {'index': 2, 'answer': 2}, {'index': 3, 'answer': 3}, {'index': 4, 'answer': 4}]
    }
  ],
  /* 视频数据 */
  videoBank: [
    {
      belong: 'knowledge',
      index: 1,
      path: '../../static/video/1.mp4'
    },
    {
      belong: 'knowledge',
      index: 2,
      path: '../../static/video/2.mp4'
    },
    {
      belong: 'adventure',
      index: 1,
      path: '../../static/video/01.mp4'
    },
    {
      belong: 'adventure',
      index: 2,
      path: '../../static/video/02.mp4'
    },
    {
      belong: 'adventure',
      index: 3,
      path: '../../static/video/03.mp4'
    },
    {
      belong: 'adventure',
      index: 4,
      path: '../../static/video/04.mp4'
    }
  ],
  /* 课件数据 */
  courseBank: [
    {
      belong: 'knowledge',
      index: 1,
      route: 'dragCourse'
    },
    {
      belong: 'knowledge',
      index: 2,
      route: 'clickRect'
    },
    {
      belong: 'knowledge',
      index: 3,
      route: 'clickRect2'
    },
    {
      belong: 'knowledge',
      index: 4,
      route: 'drawRect'
    },
    {
      belong: 'knowledge',
      index: 5,
      route: 'showGame'
    },
    {
      belong: 'adventure',
      index: 1,
      route: 'adventureDrag1'
    },
    {
      belong: 'adventure',
      index: 2,
      route: 'adventureDrag2'
    },
    {
      belong: 'adventure',
      index: 3,
      route: 'adventureColor'
    }
  ]
}
const getters = {
  count: function (state) {
    state.count += 100
    return state.count
  }
}
const mutations = {
  add (state, num) {
    state.count += num
  },
  reduce (state, num) {
    state.count -= num
  }
}
const actions = {
  addAction (context) {
    context.commit('add', 10)
  },
  reduceAction ({commit}) {
    commit('reduce', 2)
  }
}
/* 用模型记录一个用户的数据 */
const module1 = {
  state,
  mutations,
  getters,
  actions,
  computed: mapState(['count'])
}
export default new Vuex.Store({
  modules: {a: module1}
})
/* export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  computed: mapState(['count'])
}) */
