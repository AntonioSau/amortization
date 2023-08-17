<script>

import axios from 'axios';
import { onMounted, ref } from 'vue';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';


export default {
  name: 'my-component',
  
  data(){
    return {
      columns: [
        {
          label: 'ID',
          field: 'id',
          thClass:"px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase hidden md:table-cell",
          tdClass:"  text-sm  text-gray-500 uppercase hidden md:table-cell"

        },
        {
          label: 'Schedule',
          field: 'schedule_date',
          type: 'date',
          thClass:"px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase hidden md:table-cell",
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM do yy',
          tdClass:"  text-sm  text-gray-500 uppercase hidden md:table-cell"

        },
        {
          label: 'State',
          field: 'state',
          type: 'string',
          thClass:"px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase",
          tdClass:"  text-sm  text-gray-500 uppercase",
          filterOptions: {
            styleClass: 'filter-1', // class to be added to the parent th element
            enabled: true, // enable filter for this column
            placeholder: 'State', // placeholder for filter input
             filterDropdownItems: ['Paid','Pending'], // dropdown (with selected values) instead of text input
          }, 
        },
        {
          label: 'Amount',
          field: 'amount',
          type: 'float',
          thClass:"px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase",
          tdClass:"  text-sm  text-gray-500 uppercase",
          filterOptions: {
            styleClass: 'filter-1', // class to be added to the parent th element
            enabled: true, // enable filter for this column
            placeholder: 'Amount', // placeholder for filter input
          },  
        },
        {
          label: 'Project',
          field: 'project_id',
          type: 'int',
          thClass:"px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase",
          tdClass:"  text-sm  text-gray-500 uppercase",
          filterOptions: {
            styleClass: 'filter-1', // class to be added to the parent th element
            enabled: true, // enable filter for this column
            placeholder: 'Project', // placeholder for filter input
          },  
        },
      ],
      rows: [],
    };
  },
  setup() {
    

    const amortizations = ref([]);

    onMounted(() => {
      // Fetch data from Laravel backend API
      axios
        .get('http://localhost:8000/api/amortizations')
        .then((res) => {
          amortizations.value = res.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    return { 
      amortizations,
    };
  }
};
</script>


<style>
.vgt-table {
  border: none !important;
}
.vgt-table tr{
  border: none !important;
}
.vgt-table th {
  border: none !important;
}
.vgt-table thead th{
  background-color: antiquewhite !important;
  background: linear-gradient(#ffc84b, #ffc84b) !important;
}

.vgt-table th {
  border: none !important; 
  text-align: center;
}  
</style>

<template>
  <main class="container flex items-center justify-center  mx-auto">
    <div class="flex flex-col w-full">
            <div class="mt-3  border rounded-lg ">

            <div>
              <vue-good-table
                :columns="columns"
                :rows="amortizations"
                :paginate="true"
                :lineNumbers="false"
                :fixed-header="true"
                :pagination-options="{
                    enabled: true,
                    mode: 'records',
                    perPage: 5,
                    position: 'top',
                    perPageDropdown: [3, 7, 9],
                    setCurrentPage: 1,
                    jumpFirstOrLast : true,
                    nextLabel: 'Next',
                    prevLabel: 'Prev',
                    
                  }">
                  <template slot="column-filter" slot-scope="props">
                    <my-custom-filter
                      v-if="props.column.filterOptions.customFilter"       
                      @input="handleCustomFilter"/>
                  </template>
                <div slot="emptystate">
                No amortizations
              </div>
            </vue-good-table>
            </div>
          </div>
     </div>
  </main>
</template>


