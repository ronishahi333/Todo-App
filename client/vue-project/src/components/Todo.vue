<template>
  <div>
    <div class="grid grid-cols-6 min-h-screen bg-rang-200">
      <div
        class="col-start-3 col-span-2 bg-rang-100 flex items-center justify-center mt-20"
        style="
          min-height: 20vh;
          box-shadow: 0 4px 6px rgba(145, 144, 144, 0.1);
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        "
      >
        <form class="w-4/5 mb-3" @submit.prevent="addNotes">
          <div
            class="flex items-center justify-center text-3xl text-white mb-6 mt-2"
          >
            TO-DO List
          </div>
          <label
            for="search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >Search</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 start-0 ps-3 pointer-events-none"
            ></div>
            <input
              v-model="inputClear"
              type="text"
              id="addNotes"
              class="mt-2 w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="What would you like to add?"
              required
            />
            <button
              type="submit"
              class="text-white absolute end-2.5 bottom-2.5 bg-rang-400 hover:bg-red-500 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Notes
            </button>
          </div>
        </form>
      </div>

      <!-- Added Note Toast Message -->
      <div
        id="toast-success"
        class="absolute top-0 right-0 mt-4 mr-4 z-50 flex items-center w-80 p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
        style="max-width: 500px; display: none"
      >
        <div class="flex items-center">
          <div
            class="inline-flex items-center justify-center flex-shrink-0 ml-5 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
              />
            </svg>
            <span class="sr-only">Check icon</span>
          </div>
          <div class="ml-2 text-sm font-normal">Notes added successfully</div>
        </div>
      </div>

      <!-- Deleted Note Toast Message -->
      <div
        id="toast-delete"
        class="absolute top-0 right-0 mt-4 mr-4 z-50 flex items-center w-80 p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
        style="max-width: 500px; display: none"
      >
        <div class="flex items-center">
          <div
            class="inline-flex items-center justify-center flex-shrink-0 ml-5 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
              />
            </svg>
            <span class="sr-only">Error icon</span>
          </div>
          <div class="ml-2 text-sm font-normal">Notes deleted successfully</div>
        </div>
      </div>

      <div
        class="col-start-3 col-span-2 bg-rang-300 flex items-center justify-center mb-10"
        style="
          min-height: 60vh;
          box-shadow: 0 4px 6px rgba(145, 144, 144, 0.1);
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        "
      >
        <div
          class="relative overflow-x-auto shadow-md sm:rounded-lg w-4/5 h-96 bg-white"
        >
          <table
            class="w-full h-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">List</th>
                <th scope="col" class="px-6 py-3"></th>
                <th scope="col" class="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                v-for="note in notes"
                :key="note"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ note.description }}
                </th>
                <td class="px-6 py-4"></td>
                <td class="px-6 py-4 flex">
                  <a
                    class="font-medium text-blue-600 hover:text-blue-500 cursor-pointer mr-3"
                    data-modal-toggle="authentication-modal"
                    @click="openEditNotesModal(note.description)"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-pencil"
                    >
                      <path
                        d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"
                      />
                      <path d="m15 5 4 4" />
                    </svg>
                  </a>
                  <!-- Overlay -->
                  <div
                    v-if="NotesEditModal"
                    class="fixed inset-0 z-40 bg-gray-900 opacity-10 flex items-center justify-center"
                  ></div>

                  <!-- Main modal -->
                  <div
                    id="edit-authentication-modal"
                    :class="{ hidden: !NotesEditModal }"
                    tabindex="-1"
                    aria-hidden="true"
                    class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center"
                  >
                    <!-- Modal content -->
                    <div class="relative w-full max-w-md max-h-full">
                      <!-- Modal content -->
                      <div
                        class="relative bg-white rounded-lg shadow dark:bg-gray-700"
                      >
                        <button
                          type="button"
                          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          @click="closeModal()"
                        >
                          <svg
                            class="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                          <span class="sr-only">Close modal</span>
                        </button>
                        <div class="px-6 py-6 lg:px-8">
                          <h3
                            class="mb-8 text-xl font-medium text-gray-900 dark:text-white"
                          >
                            Edit List
                          </h3>
                          <form class="space-y-6">
                            <div>
                              <label
                                for="notenames"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >List Name</label
                              >
                              <input
                                type="text"
                                name="notenames"
                                v-model ="getExistingNotes"
                                id="updatedNotes"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                              />
                            </div>
                            <button
                              @click="updateNotes(note.name)"
                              type="submit"
                              class="w-full text-white bg-rang-100 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Save
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    @click="deleteNotes(note.id)"
                    class="font-medium text-rang-400 hover:text-red-500 cursor-pointer"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-trash-2"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "Todo App",
      notes: [],
      inputClear: "",
      NotesEditModal: false,
      currentTodoId: "",
      getExistingNotes: ""
    };
  },

  methods: {
    async refreshData() {
      axios.get("http://localhost:5038/todo").then((response) => {
        this.notes = response.data;
        console.log(this.notes);
        this.currentTodoId = response.data[0].id;
        console.log(this.currentTodoId);
      });
    },

    async addNotes() {
      const newNotes = document.getElementById("addNotes").value;
      const formData = new FormData();
      formData.append("addNotes", newNotes);
      this.notess = response.data[0].id;
          console.log(this.notess);

      await axios
        .post("http://localhost:5038/addtodo", formData)
        .then((response) => {
          this.refreshData();
          alert("Click Ok");
          const toast = document.getElementById("toast-success");
          toast.style.display = "block";
          // Hides the toast after 2 seconds
          setTimeout(() => {
            toast.style.display = "none";
          }, 1500);
          this.inputClear = "";
        });
    },

    openEditNotesModal(note) {
      console.log("Edit Button Clicked",note);
      this.NotesEditModal = true;
      this.getExistingNotes = note;
    },

    closeModal() {
      this.NotesEditModal = false;
    },

    async updateNotes(name) {
    const todoId = this.currentTodoId;
    console.log(todoId);
    const updatedNotes = document.getElementById("updatedNotes").value;
    const formData = new FormData();
    formData.append("updatedNotes", updatedNotes);

    await axios
      .put(`http://localhost:5038/updatetodo/?notenames=` + name, formData)
      .then((response) => {
        // Handle success
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  },
    async deleteNotes(id) {
      axios
        .delete("http://localhost:5038/deletetodo?id=" + id)
        .then((response) => {
          this.refreshData();
          alert("Click Ok");
          // alert(response.data);
          const toast = document.getElementById("toast-delete");
          toast.style.display = "block";
          // Hides the toast after 2 seconds
          setTimeout(() => {
            toast.style.display = "none";
          }, 1500);
        });
    },
  },

  mounted: function () {
    this.refreshData();
  },
};
</script>