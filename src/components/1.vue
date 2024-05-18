<template>
  <div>
    <!-- Your component template -->
    <button @click="saveData">Save Data</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      componentData: {
        // Your data here
        foo: 'bar'
      }
    };
  },
  methods: {
    ...mapMutations(['updateComponentData']),
    saveData() {
      this.updateComponentData({ componentName: 'ComponentA', data: this.componentData });
    }
  }
};
</script>
