
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button, TextField, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import * as Yup from "yup";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

// Create a validation schema using Yup
const validationSchema = Yup.object().shape({
    EmployeeID: Yup.number().required("Employee ID is required"),
    firstDayAway: Yup.date()
        .min(dayjs().startOf("day").toDate(), "First Day Away cannot be in the past")
        .required("First Day Away is required"),
    firstDayBack: Yup.date()
        .min(Yup.ref("firstDayAway"), "First Day Back cannot be before the First Day Away")
        .required("First Day Back is required"),
    vacationType: Yup.string().required("Vacation Type is required"),
    notes: Yup.string(),
});

const Requests = () => {
    const [step, setStep] = useState(1);  // Keep track of the step (1 = form, 2 = review)
    const [openConfirm, setOpenConfirm] = useState(false);
    const initialValues = {
        EmployeeID: "",
        firstDayAway: "",
        firstDayBack: "",
        vacationType: "",
        notes: "",
    };

    const navigate = useNavigate();

    const handleSubmit = (values) => {
        console.log(values); // Here, you'd send the form data to the server
        setOpenConfirm(false); // Close the confirmation dialog after submission
        navigate('/');  // Redirect to home page after submission
    };

    const handleConfirm = () => {
        setOpenConfirm(true);
    };

    return (
        <div className="font-[sans-serif]">
            <div className="w-[600px]">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema} // Add validation schema to Formik
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, isValid, dirty }) => (
                        <Form className="bg-white max-w-xl w-full mx-auto shadow-md p-8 rounded-2xl">
                            <div className="mb-12">
                                <h3 className="text-gray-800 text-3xl font-bold text-center">
                                    Vacation Request
                                </h3>
                            </div>

                            {step === 1 && (
                                <>
                                    <div>
                                        <label className="text-gray-800 text-xs block mb-2">Employee ID</label>
                                        <Field
                                            as={TextField}
                                            name="EmployeeID"
                                            type="number"
                                            required
                                            fullWidth
                                            variant="standard"
                                            onChange={handleChange}
                                            placeholder="Scan your card"
                                            error={touched.EmployeeID && !!errors.EmployeeID}
                                            helperText={touched.EmployeeID && errors.EmployeeID}
                                        />
                                    </div>

                                    <div className="mt-8">
                                        <label className="text-gray-800 text-xs block mb-2">First Day Away</label>
                                        <Field
                                            as={TextField}
                                            name="firstDayAway"
                                            type="date"
                                            required
                                            fullWidth
                                            variant="standard"
                                            onChange={handleChange}
                                            error={touched.firstDayAway && !!errors.firstDayAway}
                                            helperText={touched.firstDayAway && errors.firstDayAway}
                                        />
                                    </div>

                                    <div className="mt-8">
                                        <label className="text-gray-800 text-xs block mb-2">First Day Back</label>
                                        <Field
                                            as={TextField}
                                            name="firstDayBack"
                                            type="date"
                                            required
                                            fullWidth
                                            variant="standard"
                                            onChange={handleChange}
                                            error={touched.firstDayBack && !!errors.firstDayBack}
                                            helperText={touched.firstDayBack && errors.firstDayBack}
                                        />
                                    </div>

                                    <div className="mt-8">
                                        <label className="text-gray-800 text-xs block mb-2">Vacation Type</label>
                                        <Field
                                            as={TextField}
                                            name="vacationType"
                                            select
                                            required
                                            fullWidth
                                            variant="standard"
                                            onChange={handleChange}
                                            error={touched.vacationType && !!errors.vacationType}
                                            helperText={touched.vacationType && errors.vacationType}
                                        >
                                            <MenuItem value="">Select a Type</MenuItem>
                                            <MenuItem value="Vacation">Vacation</MenuItem>
                                            <MenuItem value="Holiday">Holiday</MenuItem>
                                            <MenuItem value="Sick">Sick</MenuItem>
                                        </Field>
                                    </div>

                                    <div className="mt-8">
                                        <label className="text-gray-800 text-xs block mb-2">Notes</label>
                                        <Field
                                            as={TextField}
                                            name="notes"
                                            multiline
                                            rows={4}
                                            fullWidth
                                            variant="standard"
                                            placeholder="Add notes..."
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mt-8 flex justify-center">
                                        <Button
                                            disableElevation
                                            disableRipple
                                            variant="contained"
                                            disabled={!dirty || !isValid} // Disable until the form is valid
                                            className="px-6 py-3 text-base font-semibold text-white bg-[#1a948c]  rounded-full hover:bg-[#343e70] hover:text-white transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#1a948c] focus:outline-none focus:ring-opacity-50"
                                            onClick={() => setStep(2)} // Move to step 2
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <div>
                                        <h4 className="text-gray-800 text-lg mb-4">Review Your Request</h4>
                                        <p>Employee ID: {values.EmployeeID}</p>
                                        <p>First Day Away: {values.firstDayAway}</p>
                                        <p>First Day Back: {values.firstDayBack}</p>
                                        <p>Vacation Type: {values.vacationType}</p>
                                        <p>Notes: {values.notes}</p>
                                    </div>

                                    <div className="mt-8 flex justify-between">
                                        <Button
                                            variant="contained"
                                            className="px-6 py-3 text-base font-semibold text-white bg-gray-400 rounded-full hover:bg-gray-600 hover:text-white transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-gray-400 focus:outline-none focus:ring-opacity-50"
                                            onClick={() => setStep(1)} // Go back to step 1
                                        >
                                            Back
                                        </Button>

                                        <Button
                                            variant="contained"
                                            className="px-6 py-3 text-base font-semibold text-white bg-[#1a948c] rounded-full hover:bg-[#343e70] hover:text-white transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#1a948c] focus:outline-none focus:ring-opacity-50"
                                            onClick={handleConfirm}
                                        >
                                            Submit Request
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    )}
                </Formik>

                {/* Confirmation Dialog */}
                <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
                    <DialogTitle>Submit Request</DialogTitle>
                    <DialogContent>
                        <p>Are you sure you want to submit your vacation request?</p>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            className="px-6 py-3 text-base font-semibold text-white bg-[#1a948c] rounded-full hover:bg-[#343e70] hover:text-white transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#1a948c] focus:outline-none focus:ring-opacity-50"
                            onClick={() => setOpenConfirm(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="px-6 py-3 text-base font-semibold text-white bg-[#1a948c] rounded-full hover:bg-[#343e70] hover:text-white transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#1a948c] focus:outline-none focus:ring-opacity-50"
                            onClick={handleSubmit}
                        >
                            Yes, Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default Requests;


