<template>
  <q-page class="q-pa-md">
      <h5 class="text-h5 q-mt-none">Edit Post</h5>
      <q-input v-model="title" label="Title" stack-label/>
      <q-input v-model="content" label="Content" type="textarea" stack-label/>
      <q-input v-model="category" label="Category" stack-label/>

      <q-btn type="button" :loading="loading" label="Draft" class="q-mt-md q-mr-md" color="grey-14"
      :disable="loading"
      @click="submitDraft"
      >
      <template v-slot:loading>
        <q-spinner-facebook />
      </template>
      </q-btn>

      <q-btn type="button" :loading="loading" label="Publish" class="q-mt-md" color="primary"
      :disable="loading"
      @click="submitPublish"
      >
      <template v-slot:loading>
        <q-spinner-facebook />
      </template>
      </q-btn>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { api } from 'src/boot/axios'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const loading = ref(false)
    const title = ref("")
    const content = ref("")
    const category = ref("")
    const status = ref("")
    const route = useRoute()
    const router = useRouter()
    const postId = route.params.id

    const getDetailPost = async (id) => {
      const request = api.get(`/article/${id}`)
      const response = await request
      const data = response?.data

      if (response.status == 200) {
        title.value = data.title
        content.value = data.content
        category.value = data.category
        status.value = data.status
      }
    }

    onMounted(() => {
      getDetailPost(postId)
    })


    const prepareData = () => {
      const error = []

      return [{
        'title': title.value,
        'content': content.value,
        'category': category.value,
        'status': ''
      }, error]
    }

    const submitDraft = async () => {
      try {
        const [ data, error ] = prepareData()
        console.log(data)
        console.log(error)


        if (error.length != 0) {
          error.forEach((e) => {
            alert(e)
          })
          return
        }
        data['status'] = 'draft'
        const request = api.put(`/article/${postId}`, data)
        const response = await request
        if (response.status == 202) {
          router.push('/all')
        }

      } catch (e) {
        console.error(e)
      }
    }

    const submitPublish = async () => {
      try {
        const  [ data, error ] = prepareData()
        if (error.length != 0) {
          error.forEach((e) => {
            alert(e)
          })
          return
        }
        data['status'] = 'publish'
        const request = api.put(`/article/${postId}`, data)
        const response = await request
        if (response.status == 202) {
          router.push('/all')
        }
        console.log(response.data)

      } catch (e) {
        console.error(e)
      }
    }

    return {
      loading, title, content, category, submitDraft, submitPublish
    }
  },
  name: 'EditPostPage'
})
</script>
