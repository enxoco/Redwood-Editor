import { getField, updateField } from 'vuex-map-fields';

export const state = () => ({
    config: [{ value: "siteone.com" }]
})

export const getters = () => ({
    getField
})

export const mutations = {
    add(state, text) {
        console.log(state.config)
        state.config.push(text)
    },
    remove(state, index) {
        state.config.splice(state.config.index, 1)
    },
    toggle(state, todo) {
        todo.done = !todo.done
    }
}