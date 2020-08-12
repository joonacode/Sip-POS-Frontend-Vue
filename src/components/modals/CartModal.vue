<template>
  <div class="modal fade pr-0" id="modalCart" tabindex="-1" role="dialog" aria-labelledby="modalCartLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-full">
      <div class="modal-content p-3 border-0 rounded-0">
        <div class="modal-header">
          <h5 class="modal-title font-weight-bold">Checkout</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <div class="main-cart">
            <div class="my-4">
              <div class="chart-product mb-4">
                <div class="position-relative">
                  <div class="img-list-chart" style="
                                                background-image: url('./assets/images/product/bear.png');
                                            "></div>
                  <button class="btn btn-sm delete-chart">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z" />
                    </svg>
                  </button>
                </div>
                <div class="name-input">
                  <span class="chart-title-product">Coffe Latte</span>
                  Rp. 15.000

                  <div class="input-group">
                    <div class="input-group-prepend">
                      <button class="btn btn-success-custom min-btn rounded-0" type="button">
                        -
                      </button>
                    </div>
                    <input type="text" value="1" min="1" class="form-control total-ord custom-chart-input"
                      placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                    <button class="btn ml-min btn-success-custom add-btn rounded-0" type="button">
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div class="chart-product mb-4">
                <div class="position-relative">
                  <div class="img-list-chart" style="
                                                background-image: url('./assets/images/product/blackforest.png');
                                            "></div>
                  <button class="btn btn-sm delete-chart">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z" />
                    </svg>
                  </button>
                </div>
                <div class="name-input">
                  <span class="chart-title-product">Black Forest</span>
                  Rp. 30.000

                  <div class="input-group">
                    <div class="input-group-prepend">
                      <button class="btn btn-success-custom min-btn rounded-0" type="button">
                        -
                      </button>
                    </div>
                    <input type="text" value="1" min="1" class="form-control total-ord custom-chart-input"
                      placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                    <button class="btn ml-min btn-success-custom add-btn rounded-0" type="button">
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div class="chart-product mb-4">
                <div class="position-relative">
                  <div class="img-list-chart" style="
                                                background-image: url('./assets/images/product/salmon.png');
                                            "></div>

                  <button class="btn btn-sm delete-chart">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z" />
                    </svg>
                  </button>
                </div>
                <div class="name-input">
                  <span class="chart-title-product">Salmon Truffle</span>
                  Rp. 60.000

                  <div class="input-group">
                    <div class="input-group-prepend">
                      <button class="btn btn-success-custom rounded-0 min-btn" type="button">
                        -
                      </button>
                    </div>
                    <input type="text" value="1" min="1" class="form-control total-ord custom-chart-input"
                      placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                    <button class="btn ml-min btn-success-custom rounded-0 add-btn" type="button">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="checkout pt-5">
              <div class="d-flex font-weight-bold justify-content-between">
                <span>Total: </span>
                <span>Rp. 105.000*</span>
              </div>
              <p class="mt-2 mb-1">*Belum termasuk ppn</p>
              <button class="btn btn-two font-weight-bold py-2 mb-2 btn-block" data-toggle="modal"
                data-target="#modalCheckout" id="btn-checkout-mobile">
                Checkout
              </button>
              <a href="home.html" class="btn btn-one font-weight-bold py-2 btn-block">Cancel</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartModal'
}

</script>

<style lang="scss" scoped>

</style>
