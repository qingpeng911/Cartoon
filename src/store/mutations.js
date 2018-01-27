import {
	SET_ITEM_MAP,
	SET_TAG_MAP,
} from './mutation-types.js'

import {setStore, getStore} from '../utils/mUtils'

export default {
	// 保存加载的首页数据
	[SET_ITEM_MAP](state, itemMap) {
		state.itemMap = itemMap;
	},

	// 保存加载的标签tags
	[SET_TAG_MAP](state, tagMap) {
		state.tagMap = tagMap;
	},

}
