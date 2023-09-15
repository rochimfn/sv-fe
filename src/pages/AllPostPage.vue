<template>
  <q-page class="q-pa-md">
    <h5 class="text-h5 q-mt-none q-mb-1">All Posts</h5>
    <q-tabs v-model="tab" align="left" class="shadow-1">
        <q-tab name="published" label="Published" />
        <q-tab name="drafts" label="Drafts" />
        <q-tab name="trashed" label="Trashed" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="published" class="no-padding no-margin">
            <q-table title="Published" :rows="state.published" :columns="columns" row-key="name" :pagination="initialPagination">
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn dense round flat color="grey" @click="editPost(props)" icon="edit"></q-btn>
                  <q-btn dense round flat color="grey" @click="sentToTrash(props)" icon="delete"></q-btn>
                </q-td>
              </template>
            </q-table>
          </q-tab-panel>

          <q-tab-panel name="drafts" class="no-padding no-margin">
            <q-table title="Drafted" :rows="state.drafted" :columns="columns" row-key="name" :pagination="initialPagination">
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn dense round flat color="grey" @click="editPost(props)" icon="edit"></q-btn>
                  <q-btn dense round flat color="grey" @click="sentToTrash(props)" icon="delete"></q-btn>
                </q-td>
              </template>
            </q-table>
          </q-tab-panel>

          <q-tab-panel name="trashed">
            <q-table title="Thrased" :rows="state.trashed" :columns="columns" row-key="name" :pagination="initialPagination">
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn dense round flat color="grey" @click="editPost(props)" icon="edit"></q-btn>
                  <q-btn dense round flat color="grey" @click="sentToTrash(props)" icon="delete"></q-btn>
                </q-td>
              </template>
            </q-table>
          </q-tab-panel>
        </q-tab-panels>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { api } from 'src/boot/axios'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const state = reactive({published: [], drafted: [], trashed: []})
    const getPost = async () => {
      const limit = 10000000000 // show all
      const offset = 0
      const request = api.get(`/article/${limit}/${offset}`)
      const response = await request
      if (response.status == 200) {
        const data = response?.data
        state.published = data.filter((d) => d.status == 'publish' )
        state.drafted = data.filter((d) => d.status == 'draft' )
        state.trashed = data.filter((d) => d.status == 'thrash' )
      }
    }

    const sentToTrash = async (props) => {
      const { row } = props
      const payload = JSON.parse(JSON.stringify(row))
      payload.status = 'thrash'

      console.log(payload)
      const request = api.put(`/article/${row.id}`, payload)
      const response = await request
      console.log(response.status)
      if (response.status == 202) {
        getPost()
      }

    }

    const editPost = (props) => {
      router.push(`/edit/${props.row.id}`)
    }

    onMounted(() => {
      getPost()
    })

    return {
      tab: ref('published'),
      state: state,
      columns: [
        { align: 'left', name: 'id', label: 'ID', field: 'id' },
        { align: 'left', name: 'title', label: 'Title', field: 'title' },
        { align: 'left', name: 'category', label: 'Category', field: 'category' },
        { name: 'actions', label: 'Action' }
      ],
      initialPagination: {
        rowsPerPage: 10
      },
      sentToTrash: sentToTrash,
      editPost: editPost,
    }
  },
  name: 'AllPostPage'
})
</script>
