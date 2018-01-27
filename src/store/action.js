import {
	apiHome
} from '../service/api'
import {
	SET_ITEM_MAP
} from './mutation-types.js'

export default {

	async getItemMap({
		commit,
		state
	}) {
		let res = await ApiHome();
		commit(SET_ITEM_MAP, res)
	}
}