
<script>
export default {
  data() {
    return {
     
    }
  },
   render(h) {
        return h('a', {}, this.$slots.default)

    }
}
</script>