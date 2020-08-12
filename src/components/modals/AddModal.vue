<template>
  <div class="modal fade" id="addMenu" tabindex="-1" role="dialog" aria-labelledby="addMenuLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content p-3 rounded-xs">
        <div class="modal-header border-bottom-0">
          <h5 class="modal-title font-weight-bold" id="addMenuLabel">
            Add Item
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                <input type="text" class="form-control form-shadow" />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Image</label>
              <div class="col-sm-10">
                <input type="file" class="form-control form-shadow" />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Price</label>
              <div class="col-sm-10">
                <input type="number" class="form-control form-shadow" />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Category</label>
              <div class="col-sm-10">
                <select name="category" class="form-control form-shadow">
                  <option value="" disabled selected>Category</option>
                  <option value="food">Food</option>
                  <option value="drink">Drink</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer border-top-0">
          <button type="button" class="btn btn-one px-4 rounded-xs" data-dismiss="modal">
            Cancel
          </button>
          <button type="button" class="btn btn-two px-4 rounded-xs">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddModal'
}

</script>

<style lang="scss" scoped>

</style>
