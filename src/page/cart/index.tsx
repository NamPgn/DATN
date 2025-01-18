
const Cart = () => {
  return (
    <section className="cartPageSection woocommerce">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="cartHeader">
              <h3>Your Cart Items</h3>
            </div>
          </div>
          <div className="col-lg-12">
            <table className="shop_table cart_table">
              <thead>
                <tr>
                  <th className="product-thumbnail">Item Name</th>
                  <th className="product-name">&nbsp;</th>
                  <th className="product-price">Price</th>
                  <th className="product-quantity">Quantity</th>
                  <th className="product-subtotal">Total</th>
                  <th className="product-remove">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="product-thumbnail">
                    <a href="shop_details1.html">
                      <img src="/assets/images/cart/1.jpg" alt="Cart Item" />
                    </a>
                  </td>
                  <td className="product-name">
                    <a href="shop_details1.html">
                      Ulina luxurious bag for men women
                    </a>
                  </td>
                  <td className="product-price">
                    <div className="pi01Price">
                      <ins>$48.00</ins>
                    </div>
                  </td>
                  <td className="product-quantity">
                    <div className="quantity clearfix">
                      <button
                        type="button"
                        name="btnMinus"
                        className="qtyBtn btnMinus"
                      >
                        _
                      </button>
                      <input
                        type="number"
                        className="carqty input-text qty text"
                        name="quantity"
                      />
                      <button
                        type="button"
                        name="btnPlus"
                        className="qtyBtn btnPlus"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="product-subtotal">
                    <div className="pi01Price">
                      <ins>$48.00</ins>
                    </div>
                  </td>
                  <td className="product-remove">
                    <a href="javascript:void(0);" className="remove">
                      <span />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="product-thumbnail">
                    <a href="shop_details2.html">
                      <img src="/assets/images/cart/2.jpg" alt="Cart Item" />
                    </a>
                  </td>
                  <td className="product-name">
                    <a href="shop_details2.html">Nasio stainless steel watch</a>
                  </td>
                  <td className="product-price">
                    <div className="pi01Price">
                      <ins>$52.00</ins>
                    </div>
                  </td>
                  <td className="product-quantity">
                    <div className="quantity clearfix">
                      <button
                        type="button"
                        name="btnMinus"
                        className="qtyBtn btnMinus"
                      >
                        _
                      </button>
                      <input
                        type="number"
                        className="carqty input-text qty text"
                        name="quantity"
                      />
                      <button
                        type="button"
                        name="btnPlus"
                        className="qtyBtn btnPlus"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="product-subtotal">
                    <div className="pi01Price">
                      <ins>$52.00</ins>
                    </div>
                  </td>
                  <td className="product-remove">
                    <a href="javascript:void(0);" className="remove">
                      <span />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="product-thumbnail">
                    <a href="shop_details1.html">
                      <img src="/assets/images/cart/3.jpg" alt="Cart Item" />
                    </a>
                  </td>
                  <td className="product-name">
                    <a href="shop_details1.html">
                      Winner men’s comfortable t-shirt
                    </a>
                  </td>
                  <td className="product-price">
                    <div className="pi01Price">
                      <ins>$33.00</ins>
                    </div>
                  </td>
                  <td className="product-quantity">
                    <div className="quantity clearfix">
                      <button
                        type="button"
                        name="btnMinus"
                        className="qtyBtn btnMinus"
                      >
                        _
                      </button>
                      <input
                        type="number"
                        className="carqty input-text qty text"
                        name="quantity"
                      />
                      <button
                        type="button"
                        name="btnPlus"
                        className="qtyBtn btnPlus"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="product-subtotal">
                    <div className="pi01Price">
                      <ins>$33.00</ins>
                    </div>
                  </td>
                  <td className="product-remove">
                    <a href="javascript:void(0);" className="remove">
                      <span />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="product-thumbnail">
                    <a href="shop_details2.html">
                      <img src="/assets/images/cart/4.jpg" alt="Cart Item" />
                    </a>
                  </td>
                  <td className="product-name">
                    <a href="shop_details2.html">
                      Ulina easy carry bag for women
                    </a>
                  </td>
                  <td className="product-price">
                    <div className="pi01Price">
                      <ins>$99.00</ins>
                    </div>
                  </td>
                  <td className="product-quantity">
                    <div className="quantity clearfix">
                      <button
                        type="button"
                        name="btnMinus"
                        className="qtyBtn btnMinus"
                      >
                        _
                      </button>
                      <input
                        type="number"
                        className="carqty input-text qty text"
                        name="quantity"
                      />
                      <button
                        type="button"
                        name="btnPlus"
                        className="qtyBtn btnPlus"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="product-subtotal">
                    <div className="pi01Price">
                      <ins>$99.00</ins>
                    </div>
                  </td>
                  <td className="product-remove">
                    <a href="javascript:void(0);" className="remove">
                      <span />
                    </a>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="actions">
                  <td colSpan={2} className="text-start">
                    <a href="shop_full_width.html" className="ulinaBTN">
                      <span>Continue Shopping</span>
                    </a>
                  </td>
                  <td colSpan={4} className="text-end">
                    <a href="shop_full_width.html" className="ulinaBTN2">
                      Update Cart
                    </a>
                    <a href="shop_full_width.html" className="ulinaBTN2">
                      Clear All
                    </a>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="row cartAccessRow">
          <div className="col-md-6 col-lg-4">
            <div className="calculatShippingForm">
              <h3>Calculate Shipping</h3>
              <div className="shippingFormElements">
                <label>Country</label>
                <div className="sfeItem">
                  <select name="country" style={{ display: "none" }}>
                    <option value="">Select a country</option>
                    <option value="AF">Afghanistan</option>
                    <option value="AX">Åland Islands</option>
                    <option value="AL">Albania</option>
                    <option value="DZ">Algeria</option>
                    <option value="AS">American Samoa</option>
                    <option value="AD">Andorra</option>
                    <option value="AO">Angola</option>
                    <option value="AI">Anguilla</option>
                    <option value="AQ">Antarctica</option>
                    <option value="AG">Antigua and Barbuda</option>
                    <option value="AR">Argentina</option>
                    <option value="AM">Armenia</option>
                    <option value="AW">Aruba</option>
                    <option value="AU">Australia</option>
                    <option value="AT">Austria</option>
                    <option value="AZ">Azerbaijan</option>
                    <option value="BS">Bahamas</option>
                    <option value="BH">Bahrain</option>
                    <option value="BD">Bangladesh</option>
                    <option value="BB">Barbados</option>
                    <option value="BY">Belarus</option>
                    <option value="PW">Belau</option>
                    <option value="BE">Belgium</option>
                    <option value="BZ">Belize</option>
                    <option value="BJ">Benin</option>
                    <option value="BM">Bermuda</option>
                    <option value="BT">Bhutan</option>
                    <option value="BO">Bolivia</option>
                    <option value="BQ">
                      Bonaire, Saint Eustatius and Saba
                    </option>
                    <option value="BA">Bosnia and Herzegovina</option>
                    <option value="BW">Botswana</option>
                    <option value="BV">Bouvet Island</option>
                    <option value="BR">Brazil</option>
                    <option value="IO">British Indian Ocean Territory</option>
                    <option value="BN">Brunei</option>
                    <option value="BG">Bulgaria</option>
                    <option value="BF">Burkina Faso</option>
                    <option value="BI">Burundi</option>
                    <option value="KH">Cambodia</option>
                    <option value="CM">Cameroon</option>
                    <option value="CA">Canada</option>
                    <option value="CV">Cape Verde</option>
                    <option value="KY">Cayman Islands</option>
                    <option value="CF">Central African Republic</option>
                    <option value="TD">Chad</option>
                    <option value="CL">Chile</option>
                    <option value="CN">China</option>
                    <option value="CX">Christmas Island</option>
                    <option value="CC">Cocos (Keeling) Islands</option>
                    <option value="CO">Colombia</option>
                    <option value="KM">Comoros</option>
                    <option value="CG">Congo (Brazzaville)</option>
                    <option value="CD">Congo (Kinshasa)</option>
                    <option value="CK">Cook Islands</option>
                    <option value="CR">Costa Rica</option>
                    <option value="HR">Croatia</option>
                    <option value="CU">Cuba</option>
                    <option value="CW">Curaçao</option>
                    <option value="CY">Cyprus</option>
                    <option value="CZ">Czech Republic</option>
                    <option value="DK">Denmark</option>
                    <option value="DJ">Djibouti</option>
                    <option value="DM">Dominica</option>
                    <option value="DO">Dominican Republic</option>
                    <option value="EC">Ecuador</option>
                    <option value="EG">Egypt</option>
                    <option value="SV">El Salvador</option>
                    <option value="GQ">Equatorial Guinea</option>
                    <option value="ER">Eritrea</option>
                    <option value="EE">Estonia</option>
                    <option value="SZ">Eswatini</option>
                    <option value="ET">Ethiopia</option>
                    <option value="FK">Falkland Islands</option>
                    <option value="FO">Faroe Islands</option>
                    <option value="FJ">Fiji</option>
                    <option value="FI">Finland</option>
                    <option value="FR">France</option>
                    <option value="GF">French Guiana</option>
                    <option value="PF">French Polynesia</option>
                    <option value="TF">French Southern Territories</option>
                    <option value="GA">Gabon</option>
                    <option value="GM">Gambia</option>
                    <option value="GE">Georgia</option>
                    <option value="DE">Germany</option>
                    <option value="GH">Ghana</option>
                    <option value="GI">Gibraltar</option>
                    <option value="GR">Greece</option>
                    <option value="GL">Greenland</option>
                    <option value="GD">Grenada</option>
                    <option value="GP">Guadeloupe</option>
                    <option value="GU">Guam</option>
                    <option value="GT">Guatemala</option>
                    <option value="GG">Guernsey</option>
                    <option value="GN">Guinea</option>
                    <option value="GW">Guinea-Bissau</option>
                    <option value="GY">Guyana</option>
                    <option value="HT">Haiti</option>
                    <option value="HM">
                      Heard Island and McDonald Islands
                    </option>
                    <option value="HN">Honduras</option>
                    <option value="HK">Hong Kong</option>
                    <option value="HU">Hungary</option>
                    <option value="IS">Iceland</option>
                    <option value="IN">India</option>
                    <option value="ID">Indonesia</option>
                    <option value="IR">Iran</option>
                    <option value="IQ">Iraq</option>
                    <option value="IE">Ireland</option>
                    <option value="IM">Isle of Man</option>
                    <option value="IL">Israel</option>
                    <option value="IT">Italy</option>
                    <option value="CI">Ivory Coast</option>
                    <option value="JM">Jamaica</option>
                    <option value="JP">Japan</option>
                    <option value="JE">Jersey</option>
                    <option value="JO">Jordan</option>
                    <option value="KZ">Kazakhstan</option>
                    <option value="KE">Kenya</option>
                    <option value="KI">Kiribati</option>
                    <option value="KW">Kuwait</option>
                    <option value="KG">Kyrgyzstan</option>
                    <option value="LA">Laos</option>
                    <option value="LV">Latvia</option>
                    <option value="LB">Lebanon</option>
                    <option value="LS">Lesotho</option>
                    <option value="LR">Liberia</option>
                    <option value="LY">Libya</option>
                    <option value="LI">Liechtenstein</option>
                    <option value="LT">Lithuania</option>
                    <option value="LU">Luxembourg</option>
                    <option value="MO">Macao</option>
                    <option value="MG">Madagascar</option>
                    <option value="MW">Malawi</option>
                    <option value="MY">Malaysia</option>
                    <option value="MV">Maldives</option>
                    <option value="ML">Mali</option>
                    <option value="MT">Malta</option>
                    <option value="MH">Marshall Islands</option>
                    <option value="MQ">Martinique</option>
                    <option value="MR">Mauritania</option>
                    <option value="MU">Mauritius</option>
                    <option value="YT">Mayotte</option>
                    <option value="MX">Mexico</option>
                    <option value="FM">Micronesia</option>
                    <option value="MD">Moldova</option>
                    <option value="MC">Monaco</option>
                    <option value="MN">Mongolia</option>
                    <option value="ME">Montenegro</option>
                    <option value="MS">Montserrat</option>
                    <option value="MA">Morocco</option>
                    <option value="MZ">Mozambique</option>
                    <option value="MM">Myanmar</option>
                    <option value="NA">Namibia</option>
                    <option value="NR">Nauru</option>
                    <option value="NP">Nepal</option>
                    <option value="NL">Netherlands</option>
                    <option value="NC">New Caledonia</option>
                    <option value="NZ">New Zealand</option>
                    <option value="NI">Nicaragua</option>
                    <option value="NE">Niger</option>
                    <option value="NG">Nigeria</option>
                    <option value="NU">Niue</option>
                    <option value="NF">Norfolk Island</option>
                    <option value="KP">North Korea</option>
                    <option value="MK">North Macedonia</option>
                    <option value="MP">Northern Mariana Islands</option>
                    <option value="NO">Norway</option>
                    <option value="OM">Oman</option>
                    <option value="PK">Pakistan</option>
                    <option value="PS">Palestinian Territory</option>
                    <option value="PA">Panama</option>
                    <option value="PG">Papua New Guinea</option>
                    <option value="PY">Paraguay</option>
                    <option value="PE">Peru</option>
                    <option value="PH">Philippines</option>
                    <option value="PN">Pitcairn</option>
                    <option value="PL">Poland</option>
                    <option value="PT">Portugal</option>
                    <option value="PR">Puerto Rico</option>
                    <option value="QA">Qatar</option>
                    <option value="RE">Reunion</option>
                    <option value="RO">Romania</option>
                    <option value="RU">Russia</option>
                    <option value="RW">Rwanda</option>
                    <option value="ST">São Tomé and Príncipe</option>
                    <option value="BL">Saint Barthélemy</option>
                    <option value="SH">Saint Helena</option>
                    <option value="KN">Saint Kitts and Nevis</option>
                    <option value="LC">Saint Lucia</option>
                    <option value="SX">Saint Martin (Dutch part)</option>
                    <option value="MF">Saint Martin (French part)</option>
                    <option value="PM">Saint Pierre and Miquelon</option>
                    <option value="VC">Saint Vincent and the Grenadines</option>
                    <option value="WS">Samoa</option>
                    <option value="SM">San Marino</option>
                    <option value="SA">Saudi Arabia</option>
                    <option value="SN">Senegal</option>
                    <option value="RS">Serbia</option>
                    <option value="SC">Seychelles</option>
                    <option value="SL">Sierra Leone</option>
                    <option value="SG">Singapore</option>
                    <option value="SK">Slovakia</option>
                    <option value="SI">Slovenia</option>
                    <option value="SB">Solomon Islands</option>
                    <option value="SO">Somalia</option>
                    <option value="ZA">South Africa</option>
                    <option value="GS">South Georgia/Sandwich Islands</option>
                    <option value="KR">South Korea</option>
                    <option value="SS">South Sudan</option>
                    <option value="ES">Spain</option>
                    <option value="LK">Sri Lanka</option>
                    <option value="SD">Sudan</option>
                    <option value="SR">Suriname</option>
                    <option value="SJ">Svalbard and Jan Mayen</option>
                    <option value="SE">Sweden</option>
                    <option value="CH">Switzerland</option>
                    <option value="SY">Syria</option>
                    <option value="TW">Taiwan</option>
                    <option value="TJ">Tajikistan</option>
                    <option value="TZ">Tanzania</option>
                    <option value="TH">Thailand</option>
                    <option value="TL">Timor-Leste</option>
                    <option value="TG">Togo</option>
                    <option value="TK">Tokelau</option>
                    <option value="TO">Tonga</option>
                    <option value="TT">Trinidad and Tobago</option>
                    <option value="TN">Tunisia</option>
                    <option value="TR">Turkey</option>
                    <option value="TM">Turkmenistan</option>
                    <option value="TC">Turks and Caicos Islands</option>
                    <option value="TV">Tuvalu</option>
                    <option value="UG">Uganda</option>
                    <option value="UA">Ukraine</option>
                    <option value="AE">United Arab Emirates</option>
                    <option value="GB">United Kingdom (UK)</option>
                    <option value="US" selected={true}>
                      United States (US)
                    </option>
                    <option value="UM">
                      United States (US) Minor Outlying Islands
                    </option>
                    <option value="UY">Uruguay</option>
                    <option value="UZ">Uzbekistan</option>
                    <option value="VU">Vanuatu</option>
                    <option value="VA">Vatican</option>
                    <option value="VE">Venezuela</option>
                    <option value="VN">Vietnam</option>
                    <option value="VG">Virgin Islands (British)</option>
                    <option value="VI">Virgin Islands (US)</option>
                    <option value="WF">Wallis and Futuna</option>
                    <option value="EH">Western Sahara</option>
                    <option value="YE">Yemen</option>
                    <option value="ZM">Zambia</option>
                    <option value="ZW">Zimbabwe</option>
                  </select>
                  <div className="nice-select" tabIndex={0}>
                    <span className="current">United States (US)</span>
                    <ul className="list">
                      <li data-value="" className="option">
                        Select a country
                      </li>
                      <li data-value="AF" className="option">
                        Afghanistan
                      </li>
                      <li data-value="AX" className="option">
                        Åland Islands
                      </li>
                      <li data-value="AL" className="option">
                        Albania
                      </li>
                      <li data-value="DZ" className="option">
                        Algeria
                      </li>
                      <li data-value="AS" className="option">
                        American Samoa
                      </li>
                      <li data-value="AD" className="option">
                        Andorra
                      </li>
                      <li data-value="AO" className="option">
                        Angola
                      </li>
                      <li data-value="AI" className="option">
                        Anguilla
                      </li>
                      <li data-value="AQ" className="option">
                        Antarctica
                      </li>
                      <li data-value="AG" className="option">
                        Antigua and Barbuda
                      </li>
                      <li data-value="AR" className="option">
                        Argentina
                      </li>
                      <li data-value="AM" className="option">
                        Armenia
                      </li>
                      <li data-value="AW" className="option">
                        Aruba
                      </li>
                      <li data-value="AU" className="option">
                        Australia
                      </li>
                      <li data-value="AT" className="option">
                        Austria
                      </li>
                      <li data-value="AZ" className="option">
                        Azerbaijan
                      </li>
                      <li data-value="BS" className="option">
                        Bahamas
                      </li>
                      <li data-value="BH" className="option">
                        Bahrain
                      </li>
                      <li data-value="BD" className="option">
                        Bangladesh
                      </li>
                      <li data-value="BB" className="option">
                        Barbados
                      </li>
                      <li data-value="BY" className="option">
                        Belarus
                      </li>
                      <li data-value="PW" className="option">
                        Belau
                      </li>
                      <li data-value="BE" className="option">
                        Belgium
                      </li>
                      <li data-value="BZ" className="option">
                        Belize
                      </li>
                      <li data-value="BJ" className="option">
                        Benin
                      </li>
                      <li data-value="BM" className="option">
                        Bermuda
                      </li>
                      <li data-value="BT" className="option">
                        Bhutan
                      </li>
                      <li data-value="BO" className="option">
                        Bolivia
                      </li>
                      <li data-value="BQ" className="option">
                        Bonaire, Saint Eustatius and Saba
                      </li>
                      <li data-value="BA" className="option">
                        Bosnia and Herzegovina
                      </li>
                      <li data-value="BW" className="option">
                        Botswana
                      </li>
                      <li data-value="BV" className="option">
                        Bouvet Island
                      </li>
                      <li data-value="BR" className="option">
                        Brazil
                      </li>
                      <li data-value="IO" className="option">
                        British Indian Ocean Territory
                      </li>
                      <li data-value="BN" className="option">
                        Brunei
                      </li>
                      <li data-value="BG" className="option">
                        Bulgaria
                      </li>
                      <li data-value="BF" className="option">
                        Burkina Faso
                      </li>
                      <li data-value="BI" className="option">
                        Burundi
                      </li>
                      <li data-value="KH" className="option">
                        Cambodia
                      </li>
                      <li data-value="CM" className="option">
                        Cameroon
                      </li>
                      <li data-value="CA" className="option">
                        Canada
                      </li>
                      <li data-value="CV" className="option">
                        Cape Verde
                      </li>
                      <li data-value="KY" className="option">
                        Cayman Islands
                      </li>
                      <li data-value="CF" className="option">
                        Central African Republic
                      </li>
                      <li data-value="TD" className="option">
                        Chad
                      </li>
                      <li data-value="CL" className="option">
                        Chile
                      </li>
                      <li data-value="CN" className="option">
                        China
                      </li>
                      <li data-value="CX" className="option">
                        Christmas Island
                      </li>
                      <li data-value="CC" className="option">
                        Cocos (Keeling) Islands
                      </li>
                      <li data-value="CO" className="option">
                        Colombia
                      </li>
                      <li data-value="KM" className="option">
                        Comoros
                      </li>
                      <li data-value="CG" className="option">
                        Congo (Brazzaville)
                      </li>
                      <li data-value="CD" className="option">
                        Congo (Kinshasa)
                      </li>
                      <li data-value="CK" className="option">
                        Cook Islands
                      </li>
                      <li data-value="CR" className="option">
                        Costa Rica
                      </li>
                      <li data-value="HR" className="option">
                        Croatia
                      </li>
                      <li data-value="CU" className="option">
                        Cuba
                      </li>
                      <li data-value="CW" className="option">
                        Curaçao
                      </li>
                      <li data-value="CY" className="option">
                        Cyprus
                      </li>
                      <li data-value="CZ" className="option">
                        Czech Republic
                      </li>
                      <li data-value="DK" className="option">
                        Denmark
                      </li>
                      <li data-value="DJ" className="option">
                        Djibouti
                      </li>
                      <li data-value="DM" className="option">
                        Dominica
                      </li>
                      <li data-value="DO" className="option">
                        Dominican Republic
                      </li>
                      <li data-value="EC" className="option">
                        Ecuador
                      </li>
                      <li data-value="EG" className="option">
                        Egypt
                      </li>
                      <li data-value="SV" className="option">
                        El Salvador
                      </li>
                      <li data-value="GQ" className="option">
                        Equatorial Guinea
                      </li>
                      <li data-value="ER" className="option">
                        Eritrea
                      </li>
                      <li data-value="EE" className="option">
                        Estonia
                      </li>
                      <li data-value="SZ" className="option">
                        Eswatini
                      </li>
                      <li data-value="ET" className="option">
                        Ethiopia
                      </li>
                      <li data-value="FK" className="option">
                        Falkland Islands
                      </li>
                      <li data-value="FO" className="option">
                        Faroe Islands
                      </li>
                      <li data-value="FJ" className="option">
                        Fiji
                      </li>
                      <li data-value="FI" className="option">
                        Finland
                      </li>
                      <li data-value="FR" className="option">
                        France
                      </li>
                      <li data-value="GF" className="option">
                        French Guiana
                      </li>
                      <li data-value="PF" className="option">
                        French Polynesia
                      </li>
                      <li data-value="TF" className="option">
                        French Southern Territories
                      </li>
                      <li data-value="GA" className="option">
                        Gabon
                      </li>
                      <li data-value="GM" className="option">
                        Gambia
                      </li>
                      <li data-value="GE" className="option">
                        Georgia
                      </li>
                      <li data-value="DE" className="option">
                        Germany
                      </li>
                      <li data-value="GH" className="option">
                        Ghana
                      </li>
                      <li data-value="GI" className="option">
                        Gibraltar
                      </li>
                      <li data-value="GR" className="option">
                        Greece
                      </li>
                      <li data-value="GL" className="option">
                        Greenland
                      </li>
                      <li data-value="GD" className="option">
                        Grenada
                      </li>
                      <li data-value="GP" className="option">
                        Guadeloupe
                      </li>
                      <li data-value="GU" className="option">
                        Guam
                      </li>
                      <li data-value="GT" className="option">
                        Guatemala
                      </li>
                      <li data-value="GG" className="option">
                        Guernsey
                      </li>
                      <li data-value="GN" className="option">
                        Guinea
                      </li>
                      <li data-value="GW" className="option">
                        Guinea-Bissau
                      </li>
                      <li data-value="GY" className="option">
                        Guyana
                      </li>
                      <li data-value="HT" className="option">
                        Haiti
                      </li>
                      <li data-value="HM" className="option">
                        Heard Island and McDonald Islands
                      </li>
                      <li data-value="HN" className="option">
                        Honduras
                      </li>
                      <li data-value="HK" className="option">
                        Hong Kong
                      </li>
                      <li data-value="HU" className="option">
                        Hungary
                      </li>
                      <li data-value="IS" className="option">
                        Iceland
                      </li>
                      <li data-value="IN" className="option">
                        India
                      </li>
                      <li data-value="ID" className="option">
                        Indonesia
                      </li>
                      <li data-value="IR" className="option">
                        Iran
                      </li>
                      <li data-value="IQ" className="option">
                        Iraq
                      </li>
                      <li data-value="IE" className="option">
                        Ireland
                      </li>
                      <li data-value="IM" className="option">
                        Isle of Man
                      </li>
                      <li data-value="IL" className="option">
                        Israel
                      </li>
                      <li data-value="IT" className="option">
                        Italy
                      </li>
                      <li data-value="CI" className="option">
                        Ivory Coast
                      </li>
                      <li data-value="JM" className="option">
                        Jamaica
                      </li>
                      <li data-value="JP" className="option">
                        Japan
                      </li>
                      <li data-value="JE" className="option">
                        Jersey
                      </li>
                      <li data-value="JO" className="option">
                        Jordan
                      </li>
                      <li data-value="KZ" className="option">
                        Kazakhstan
                      </li>
                      <li data-value="KE" className="option">
                        Kenya
                      </li>
                      <li data-value="KI" className="option">
                        Kiribati
                      </li>
                      <li data-value="KW" className="option">
                        Kuwait
                      </li>
                      <li data-value="KG" className="option">
                        Kyrgyzstan
                      </li>
                      <li data-value="LA" className="option">
                        Laos
                      </li>
                      <li data-value="LV" className="option">
                        Latvia
                      </li>
                      <li data-value="LB" className="option">
                        Lebanon
                      </li>
                      <li data-value="LS" className="option">
                        Lesotho
                      </li>
                      <li data-value="LR" className="option">
                        Liberia
                      </li>
                      <li data-value="LY" className="option">
                        Libya
                      </li>
                      <li data-value="LI" className="option">
                        Liechtenstein
                      </li>
                      <li data-value="LT" className="option">
                        Lithuania
                      </li>
                      <li data-value="LU" className="option">
                        Luxembourg
                      </li>
                      <li data-value="MO" className="option">
                        Macao
                      </li>
                      <li data-value="MG" className="option">
                        Madagascar
                      </li>
                      <li data-value="MW" className="option">
                        Malawi
                      </li>
                      <li data-value="MY" className="option">
                        Malaysia
                      </li>
                      <li data-value="MV" className="option">
                        Maldives
                      </li>
                      <li data-value="ML" className="option">
                        Mali
                      </li>
                      <li data-value="MT" className="option">
                        Malta
                      </li>
                      <li data-value="MH" className="option">
                        Marshall Islands
                      </li>
                      <li data-value="MQ" className="option">
                        Martinique
                      </li>
                      <li data-value="MR" className="option">
                        Mauritania
                      </li>
                      <li data-value="MU" className="option">
                        Mauritius
                      </li>
                      <li data-value="YT" className="option">
                        Mayotte
                      </li>
                      <li data-value="MX" className="option">
                        Mexico
                      </li>
                      <li data-value="FM" className="option">
                        Micronesia
                      </li>
                      <li data-value="MD" className="option">
                        Moldova
                      </li>
                      <li data-value="MC" className="option">
                        Monaco
                      </li>
                      <li data-value="MN" className="option">
                        Mongolia
                      </li>
                      <li data-value="ME" className="option">
                        Montenegro
                      </li>
                      <li data-value="MS" className="option">
                        Montserrat
                      </li>
                      <li data-value="MA" className="option">
                        Morocco
                      </li>
                      <li data-value="MZ" className="option">
                        Mozambique
                      </li>
                      <li data-value="MM" className="option">
                        Myanmar
                      </li>
                      <li data-value="NA" className="option">
                        Namibia
                      </li>
                      <li data-value="NR" className="option">
                        Nauru
                      </li>
                      <li data-value="NP" className="option">
                        Nepal
                      </li>
                      <li data-value="NL" className="option">
                        Netherlands
                      </li>
                      <li data-value="NC" className="option">
                        New Caledonia
                      </li>
                      <li data-value="NZ" className="option">
                        New Zealand
                      </li>
                      <li data-value="NI" className="option">
                        Nicaragua
                      </li>
                      <li data-value="NE" className="option">
                        Niger
                      </li>
                      <li data-value="NG" className="option">
                        Nigeria
                      </li>
                      <li data-value="NU" className="option">
                        Niue
                      </li>
                      <li data-value="NF" className="option">
                        Norfolk Island
                      </li>
                      <li data-value="KP" className="option">
                        North Korea
                      </li>
                      <li data-value="MK" className="option">
                        North Macedonia
                      </li>
                      <li data-value="MP" className="option">
                        Northern Mariana Islands
                      </li>
                      <li data-value="NO" className="option">
                        Norway
                      </li>
                      <li data-value="OM" className="option">
                        Oman
                      </li>
                      <li data-value="PK" className="option">
                        Pakistan
                      </li>
                      <li data-value="PS" className="option">
                        Palestinian Territory
                      </li>
                      <li data-value="PA" className="option">
                        Panama
                      </li>
                      <li data-value="PG" className="option">
                        Papua New Guinea
                      </li>
                      <li data-value="PY" className="option">
                        Paraguay
                      </li>
                      <li data-value="PE" className="option">
                        Peru
                      </li>
                      <li data-value="PH" className="option">
                        Philippines
                      </li>
                      <li data-value="PN" className="option">
                        Pitcairn
                      </li>
                      <li data-value="PL" className="option">
                        Poland
                      </li>
                      <li data-value="PT" className="option">
                        Portugal
                      </li>
                      <li data-value="PR" className="option">
                        Puerto Rico
                      </li>
                      <li data-value="QA" className="option">
                        Qatar
                      </li>
                      <li data-value="RE" className="option">
                        Reunion
                      </li>
                      <li data-value="RO" className="option">
                        Romania
                      </li>
                      <li data-value="RU" className="option">
                        Russia
                      </li>
                      <li data-value="RW" className="option">
                        Rwanda
                      </li>
                      <li data-value="ST" className="option">
                        São Tomé and Príncipe
                      </li>
                      <li data-value="BL" className="option">
                        Saint Barthélemy
                      </li>
                      <li data-value="SH" className="option">
                        Saint Helena
                      </li>
                      <li data-value="KN" className="option">
                        Saint Kitts and Nevis
                      </li>
                      <li data-value="LC" className="option">
                        Saint Lucia
                      </li>
                      <li data-value="SX" className="option">
                        Saint Martin (Dutch part)
                      </li>
                      <li data-value="MF" className="option">
                        Saint Martin (French part)
                      </li>
                      <li data-value="PM" className="option">
                        Saint Pierre and Miquelon
                      </li>
                      <li data-value="VC" className="option">
                        Saint Vincent and the Grenadines
                      </li>
                      <li data-value="WS" className="option">
                        Samoa
                      </li>
                      <li data-value="SM" className="option">
                        San Marino
                      </li>
                      <li data-value="SA" className="option">
                        Saudi Arabia
                      </li>
                      <li data-value="SN" className="option">
                        Senegal
                      </li>
                      <li data-value="RS" className="option">
                        Serbia
                      </li>
                      <li data-value="SC" className="option">
                        Seychelles
                      </li>
                      <li data-value="SL" className="option">
                        Sierra Leone
                      </li>
                      <li data-value="SG" className="option">
                        Singapore
                      </li>
                      <li data-value="SK" className="option">
                        Slovakia
                      </li>
                      <li data-value="SI" className="option">
                        Slovenia
                      </li>
                      <li data-value="SB" className="option">
                        Solomon Islands
                      </li>
                      <li data-value="SO" className="option">
                        Somalia
                      </li>
                      <li data-value="ZA" className="option">
                        South Africa
                      </li>
                      <li data-value="GS" className="option">
                        South Georgia/Sandwich Islands
                      </li>
                      <li data-value="KR" className="option">
                        South Korea
                      </li>
                      <li data-value="SS" className="option">
                        South Sudan
                      </li>
                      <li data-value="ES" className="option">
                        Spain
                      </li>
                      <li data-value="LK" className="option">
                        Sri Lanka
                      </li>
                      <li data-value="SD" className="option">
                        Sudan
                      </li>
                      <li data-value="SR" className="option">
                        Suriname
                      </li>
                      <li data-value="SJ" className="option">
                        Svalbard and Jan Mayen
                      </li>
                      <li data-value="SE" className="option">
                        Sweden
                      </li>
                      <li data-value="CH" className="option">
                        Switzerland
                      </li>
                      <li data-value="SY" className="option">
                        Syria
                      </li>
                      <li data-value="TW" className="option">
                        Taiwan
                      </li>
                      <li data-value="TJ" className="option">
                        Tajikistan
                      </li>
                      <li data-value="TZ" className="option">
                        Tanzania
                      </li>
                      <li data-value="TH" className="option">
                        Thailand
                      </li>
                      <li data-value="TL" className="option">
                        Timor-Leste
                      </li>
                      <li data-value="TG" className="option">
                        Togo
                      </li>
                      <li data-value="TK" className="option">
                        Tokelau
                      </li>
                      <li data-value="TO" className="option">
                        Tonga
                      </li>
                      <li data-value="TT" className="option">
                        Trinidad and Tobago
                      </li>
                      <li data-value="TN" className="option">
                        Tunisia
                      </li>
                      <li data-value="TR" className="option">
                        Turkey
                      </li>
                      <li data-value="TM" className="option">
                        Turkmenistan
                      </li>
                      <li data-value="TC" className="option">
                        Turks and Caicos Islands
                      </li>
                      <li data-value="TV" className="option">
                        Tuvalu
                      </li>
                      <li data-value="UG" className="option">
                        Uganda
                      </li>
                      <li data-value="UA" className="option">
                        Ukraine
                      </li>
                      <li data-value="AE" className="option">
                        United Arab Emirates
                      </li>
                      <li data-value="GB" className="option">
                        United Kingdom (UK)
                      </li>
                      <li data-value="US" className="option selected">
                        United States (US)
                      </li>
                      <li data-value="UM" className="option">
                        United States (US) Minor Outlying Islands
                      </li>
                      <li data-value="UY" className="option">
                        Uruguay
                      </li>
                      <li data-value="UZ" className="option">
                        Uzbekistan
                      </li>
                      <li data-value="VU" className="option">
                        Vanuatu
                      </li>
                      <li data-value="VA" className="option">
                        Vatican
                      </li>
                      <li data-value="VE" className="option">
                        Venezuela
                      </li>
                      <li data-value="VN" className="option">
                        Vietnam
                      </li>
                      <li data-value="VG" className="option">
                        Virgin Islands (British)
                      </li>
                      <li data-value="VI" className="option">
                        Virgin Islands (US)
                      </li>
                      <li data-value="WF" className="option">
                        Wallis and Futuna
                      </li>
                      <li data-value="EH" className="option">
                        Western Sahara
                      </li>
                      <li data-value="YE" className="option">
                        Yemen
                      </li>
                      <li data-value="ZM" className="option">
                        Zambia
                      </li>
                      <li data-value="ZW" className="option">
                        Zimbabwe
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="shippingFormElements">
                <label>State</label>
                <div className="sfeItem">
                  <select name="state" style={{ display: "none" }}>
                    <option value="">Select a state</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                    <option value="AA">Armed Forces (AA)</option>
                    <option value="AE">Armed Forces (AE)</option>
                    <option value="AP">Armed Forces (AP)</option>
                  </select>
                  <div className="nice-select" tabIndex={0}>
                    <span className="current">Select a state</span>
                    <ul className="list">
                      <li data-value="" className="option selected">
                        Select a state
                      </li>
                      <li data-value="AL" className="option">
                        Alabama
                      </li>
                      <li data-value="AK" className="option">
                        Alaska
                      </li>
                      <li data-value="AZ" className="option">
                        Arizona
                      </li>
                      <li data-value="AR" className="option">
                        Arkansas
                      </li>
                      <li data-value="CA" className="option">
                        California
                      </li>
                      <li data-value="CO" className="option">
                        Colorado
                      </li>
                      <li data-value="CT" className="option">
                        Connecticut
                      </li>
                      <li data-value="DE" className="option">
                        Delaware
                      </li>
                      <li data-value="DC" className="option">
                        District Of Columbia
                      </li>
                      <li data-value="FL" className="option">
                        Florida
                      </li>
                      <li data-value="GA" className="option">
                        Georgia
                      </li>
                      <li data-value="HI" className="option">
                        Hawaii
                      </li>
                      <li data-value="ID" className="option">
                        Idaho
                      </li>
                      <li data-value="IL" className="option">
                        Illinois
                      </li>
                      <li data-value="IN" className="option">
                        Indiana
                      </li>
                      <li data-value="IA" className="option">
                        Iowa
                      </li>
                      <li data-value="KS" className="option">
                        Kansas
                      </li>
                      <li data-value="KY" className="option">
                        Kentucky
                      </li>
                      <li data-value="LA" className="option">
                        Louisiana
                      </li>
                      <li data-value="ME" className="option">
                        Maine
                      </li>
                      <li data-value="MD" className="option">
                        Maryland
                      </li>
                      <li data-value="MA" className="option">
                        Massachusetts
                      </li>
                      <li data-value="MI" className="option">
                        Michigan
                      </li>
                      <li data-value="MN" className="option">
                        Minnesota
                      </li>
                      <li data-value="MS" className="option">
                        Mississippi
                      </li>
                      <li data-value="MO" className="option">
                        Missouri
                      </li>
                      <li data-value="MT" className="option">
                        Montana
                      </li>
                      <li data-value="NE" className="option">
                        Nebraska
                      </li>
                      <li data-value="NV" className="option">
                        Nevada
                      </li>
                      <li data-value="NH" className="option">
                        New Hampshire
                      </li>
                      <li data-value="NJ" className="option">
                        New Jersey
                      </li>
                      <li data-value="NM" className="option">
                        New Mexico
                      </li>
                      <li data-value="NY" className="option">
                        New York
                      </li>
                      <li data-value="NC" className="option">
                        North Carolina
                      </li>
                      <li data-value="ND" className="option">
                        North Dakota
                      </li>
                      <li data-value="OH" className="option">
                        Ohio
                      </li>
                      <li data-value="OK" className="option">
                        Oklahoma
                      </li>
                      <li data-value="OR" className="option">
                        Oregon
                      </li>
                      <li data-value="PA" className="option">
                        Pennsylvania
                      </li>
                      <li data-value="RI" className="option">
                        Rhode Island
                      </li>
                      <li data-value="SC" className="option">
                        South Carolina
                      </li>
                      <li data-value="SD" className="option">
                        South Dakota
                      </li>
                      <li data-value="TN" className="option">
                        Tennessee
                      </li>
                      <li data-value="TX" className="option">
                        Texas
                      </li>
                      <li data-value="UT" className="option">
                        Utah
                      </li>
                      <li data-value="VT" className="option">
                        Vermont
                      </li>
                      <li data-value="VA" className="option">
                        Virginia
                      </li>
                      <li data-value="WA" className="option">
                        Washington
                      </li>
                      <li data-value="WV" className="option">
                        West Virginia
                      </li>
                      <li data-value="WI" className="option">
                        Wisconsin
                      </li>
                      <li data-value="WY" className="option">
                        Wyoming
                      </li>
                      <li data-value="AA" className="option">
                        Armed Forces (AA)
                      </li>
                      <li data-value="AE" className="option">
                        Armed Forces (AE)
                      </li>
                      <li data-value="AP" className="option">
                        Armed Forces (AP)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="shippingFormElements">
                <label>Zip Code</label>
                <div className="sfeItem">
                  <input
                    type="text"
                    name="zip_code"
                    placeholder="Enter your zip code"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="ulinaBTN"
                name="Calculate"
                value="Calculate"
              >
                <span>Calculate</span>
              </button>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="cartCoupon">
              <h3>Have A Coupon Code?</h3>
              <input
                type="text"
                name="coupon_code"
                className="input-text"
                id="coupon_code"
                defaultValue=""
                placeholder="Write your Coupon Code"
              />
              <button
                type="submit"
                className="ulinaBTN"
                name="apply_coupon"
                value="Apply Code"
              >
                <span>Apply Code</span>
              </button>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="col-sm-12 cart_totals">
              <table className="shop_table shop_table_responsive">
                <tbody>
                  <tr className="cart-subtotal">
                    <th>Subtotal</th>
                    <td data-title="Subtotal">
                      <div className="pi01Price">
                        <ins>$133.00</ins>
                      </div>
                    </td>
                  </tr>
                  <tr className="cart-shipping">
                    <th>Shipping</th>
                    <td data-title="Subtotal">
                      <div className="pi01Price">
                        <ins>$10.00</ins>
                      </div>
                    </td>
                  </tr>
                  <tr className="order-total">
                    <th>Grand Total</th>
                    <td data-title="Subtotal">
                      <div className="pi01Price">
                        <ins>$143.00</ins>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <a href="checkout.html" className="checkout-button ulinaBTN">
                <span>Proceed to checkout</span>
              </a>
              <p className="cartHints">Checkout with multiple address</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
