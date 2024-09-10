
const Requests = () => {
  return (



      <div className="font-[sans-serif]  ">


          <div className=" w-[600px] ">
              <form
                  className="bg-white max-w-xl w-full mx-auto shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-8 rounded-2xl">
                  <div className="mb-12">
                      <h3 className="text-gray-800 text-3xl font-bold text-center">Vacation Request</h3>
                  </div>

                  <div>
                      <label className="text-gray-800 text-xs block mb-2">Employee ID</label>
                      <div className="relative flex items-center">
                          <input name="EmployeeID" type="number" required
                                 className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                                 placeholder="Scan your card"/>
                      </div>
                  </div>

                  <div className="mt-8 flex-col justify-between ">
                      <label className="text-gray-800 text-xs block mb-2"> First Day Away </label>
                      <div className="">
                          <input name="First Day Away" type="date" required
                                 className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                                 placeholder="First Day Away"/>
                      </div>

                  </div>

                  <div className="mt-8 flex-col justify-between ">
                      <label className="text-gray-800 text-xs block mb-2">First Day Back</label>
                      <div className="">
                          <input name="First Day Back" type="date" required
                                 className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                                 placeholder="First Day Back"/>
                      </div>

                  </div>

                  <div className="mt-8">
                      <label className="text-gray-800 text-xs block mb-2">Vacation Type</label>
                      <div className="relative flex items-center">
                          <select name="password" required
                                  className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                          >
                              <option
                                  className="py-3 px-5 hover:bg-gray-50 text-gray-800 text-sm cursor-pointer"> Select a
                                  Type
                              </option>
                              <option
                                  className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
                                  value="Vacation">Vacation
                              </option>
                              <option className="py-3 px-5 hover:bg-gray-50 text-gray-800 text-sm cursor-pointer"
                                      value="Holiday">Holiday
                              </option>
                              <option className="py-3 px-5 hover:bg-gray-50 text-gray-800 text-sm cursor-pointer"
                                      value="Sick">Sick
                              </option>
                          </select>
                      </div>
                  </div>

                  <div className="mt-8">
                      <label className="text-gray-800 text-xs block mb-2">Notes</label>
                      <div className="relative flex items-center">
                          <textarea name="password" required
                                    className="w-full bg-transparent text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                                    placeholder=""/>
                      </div>
                  </div>

                  <div className="mt-8">
                      <button type="button"
                              className="px-6 py-3 text-base font-semibold text-white bg-[#1a948c] rounded-full hover:bg-[#343e70] hover:text-white transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#1a948c] focus:outline-none focus:ring-opacity-50">
                          Send request
                      </button>
                  </div>


              </form>
          </div>
      </div>
  );
};

export default Requests;
