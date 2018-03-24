<template>
  <div class="PageContent">
    <main class="PageMain">
      <div class="ContentHeader">
        <h2 class="ContentHeader_Title">Group List</h2>
        <div class="ContentHeader_Buttons">
          <button class="btn btn-success btn-sm text-uppercase">
            <i class="fa fa-plus"></i> Create
          </button>
        </div>
        <!-- <FilterField onChange={this.filterChange} value={filter}/> -->
      </div>
      <table class="ModelList">
        <thead>
          <tr>
            <th class="ModelList_Select">
              <i class="fa fa-folder-o"></i>
            </th>
            <th>Name</th>
            <th>Project</th>
            <th>Tags</th>
            <th>Custom Fields</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </main>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
