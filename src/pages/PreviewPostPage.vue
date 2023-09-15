<template>
  <q-page class="q-pa-md">
    <h5 class="text-h5 q-mt-none q-mb-1">Preview</h5>
    <template v-if="length == 0">
      <h6 class="text-h6">No Post</h6>
    </template>

    <template v-else="length == 0">
      <h6 class="text-h6">{{ currentPost.title }}</h6>
      <p>{{ currentPost.content }}</p>
      <p>{{ currentPost.category }}</p>
      <p>{{ currentPost.status }}</p>

      <q-btn type="button" @click="goPrev" label="Prev" class="q-mt-md" color="primary" :disable="!havePrevPost"/>
      <q-btn type="button" @click="goNext" label="Next" class="q-mt-md q-ml-md" color="primary" :disable="!haveNextPost"/>
    </template>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { api } from 'src/boot/axios'

export default defineComponent({
  setup() {
    const index = ref(0)
    const length = ref(0)
    const currentPost = reactive({title: '', content: '', category: '', status: ''})
    const haveNextPost = ref(false)
    const havePrevPost = ref(false)
    const state = reactive({published: []})
    const getPost = async () => {
      const limit = 10000000000 // show all
      const offset = 0
      const request = api.get(`/article/${limit}/${offset}`)
      const response = await request
      if (response.status == 200) {
        const data = response?.data
        state.published = data.filter((d) => d.status == 'publish' )
        length.value = state.published.length
        if (length.value > index.value) {
          const p = state.published.at(index.value)
          currentPost.category = p.category
          currentPost.content = p.content
          currentPost.status = p.status
          currentPost.title = p.title
          havePrevPost.value = false
        }

        if (length.value > (index.value+1)) {
          haveNextPost.value = true
        }
      }
    }

    const goNext = () => {
      index.value = index.value + 1
      const p = state.published.at(index.value)
      currentPost.category = p.category
      currentPost.content = p.content
      currentPost.status = p.status
      currentPost.title = p.title
      console.log(index.value)
      if (index.value == (length.value-1) ) {
        haveNextPost.value = false
      }
      havePrevPost.value = true
    }

    const goPrev = () => {
      index.value = index.value - 1
      const p = state.published.at(index.value)
      currentPost.category = p.category
      currentPost.content = p.content
      currentPost.status = p.status
      currentPost.title = p.title
      console.log(index.value)
      if (index.value == 0) {
        havePrevPost.value = false
      }
      
      if (length.value > (index.value+1)) {
        haveNextPost.value = true
      }
    }

    onMounted(() => {
      getPost()
    })

    return {
      state: state,
      columns: [
        { align: 'left', name: 'id', label: 'ID', field: 'id' },
        { align: 'left', name: 'title', label: 'Title', field: 'title' },
        { align: 'left', name: 'category', label: 'Category', field: 'category' },
        { name: 'actions', label: 'Action' }
      ],
      currentPost: currentPost,
      length: length,
      haveNextPost: haveNextPost,
      havePrevPost: havePrevPost,
      goNext: goNext,
      goPrev: goPrev
    }
  },
  name: 'PreviewPostPage'
})
</script>