
// import { useState } from "react";
// import { Formik, Form, Field } from "formik";
// import { Button, TextField, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
// import * as Yup from "yup";
// import dayjs from "dayjs";
// import { useNavigate } from "react-router-dom";
//
// // Create a validation schema using Yup
// const validationSchema = Yup.object().shape({
//     EmployeeID: Yup.number().required("Employee ID is required"),
//     firstDayAway: Yup.date()
//         .min(dayjs().startOf("day").toDate(), "First Day Away cannot be in the past")
//         .required("First Day Away is required"),
//     firstDayBack: Yup.date()
//         .min(Yup.ref("firstDayAway"), "First Day Back cannot be before the First Day Away")
//         .required("First Day Back is required"),
//     vacationType: Yup.string().required("Vacation Type is required"),
//     notes: Yup.string(),
// });
//
// const Requests = () => {
//     const [step, setStep] = useState(1);  // Keep track of the step (1 = form, 2 = review)
//     const [openConfirm, setOpenConfirm] = useState(false);
//     const initialValues = {
//         EmployeeID: "",
//         firstDayAway: "",
//         firstDayBack: "",
//         vacationType: "",
//         notes: "",
//     };
//
//     const navigate = useNavigate();
//
//     const handleSubmit = (values) => {
//         console.log(values); // Here, you'd send the form data to the server
//         setOpenConfirm(false);// Close the confirmation dialog after submission
//         localStorage.removeItem('ticket');
//         navigate('/');  // Redirect to home page after submission
//     };
//
//     const handleConfirm = () => {
//         setOpenConfirm(true);
//     };
//
//     return (
//         <div className="font-[sans-serif]">
//             <div className="w-[600px]">
//                 <Formik
//                     initialValues={initialValues}
//                     validationSchema={validationSchema} // Add validation schema to Formik
//                     onSubmit={handleSubmit}
//                 >
//                     {({ values, errors, touched, handleChange, isValid, dirty }) => (
//                         <Form className="bg-white max-w-xl w-full mx-auto shadow-md p-8 rounded-2xl">
//                             <div className="mb-12">
//                                 <h3 className="text-gray-800 text-3xl font-bold text-center">
//                                     Vacation Request
//                                 </h3>
//                             </div>
//
//                             {step === 1 && (
//                                 <>
//                                     <div>
//                                         <label className="text-gray-800 text-xs block mb-2">Employee ID</label>
//                                         <Field
//                                             as={TextField}
//                                             name="EmployeeID"
//                                             type="number"
//                                             required
//                                             fullWidth
//                                             variant="standard"
//                                             onChange={handleChange}
//                                             placeholder="Scan your card"
//                                             error={touched.EmployeeID && !!errors.EmployeeID}
//                                             helperText={touched.EmployeeID && errors.EmployeeID}
//                                         />
//                                     </div>
//
//                                     <div className="mt-8">
//                                         <label className="text-gray-800 text-xs block mb-2">First Day Away</label>
//                                         <Field
//                                             as={TextField}
//                                             name="firstDayAway"
//                                             type="date"
//                                             required
//                                             fullWidth
//                                             variant="standard"
//                                             onChange={handleChange}
//                                             error={touched.firstDayAway && !!errors.firstDayAway}
//                                             helperText={touched.firstDayAway && errors.firstDayAway}
//                                         />
//                                     </div>
//
//                                     <div className="mt-8">
//                                         <label className="text-gray-800 text-xs block mb-2">First Day Back</label>
//                                         <Field
//                                             as={TextField}
//                                             name="firstDayBack"
//                                             type="date"
//                                             required
//                                             fullWidth
//                                             variant="standard"
//                                             onChange={handleChange}
//                                             error={touched.firstDayBack && !!errors.firstDayBack}
//                                             helperText={touched.firstDayBack && errors.firstDayBack}
//                                         />
//                                     </div>
//
//                                     <div className="mt-8">
//                                         <label className="text-gray-800 text-xs block mb-2">Vacation Type</label>
//                                         <Field
//                                             as={TextField}
//                                             name="vacationType"
//                                             select
//                                             required
//                                             fullWidth
//                                             variant="standard"
//                                             onChange={handleChange}
//                                             error={touched.vacationType && !!errors.vacationType}
//                                             helperText={touched.vacationType && errors.vacationType}
//                                         >
//                                             <MenuItem value="">Select a Type</MenuItem>
//                                             <MenuItem value="Vacation">Vacation</MenuItem>
//                                             <MenuItem value="Holiday">Holiday</MenuItem>
//                                             <MenuItem value="Sick">Sick</MenuItem>
//                                         </Field>
//                                     </div>
//
//                                     <div className="mt-8">
//                                         <label className="text-gray-800 text-xs block mb-2">Notes</label>
//                                         <Field
//                                             as={TextField}
//                                             name="notes"
//                                             multiline
//                                             rows={4}
//                                             fullWidth
//                                             variant="standard"
//                                             placeholder="Add notes..."
//                                             onChange={handleChange}
//                                         />
//                                     </div>
//
//                                     <div className="mt-8 flex justify-center">
//                                         <Button
//                                             disableElevation
//                                             disableRipple
//                                             variant="contained"
//                                             disabled={!dirty || !isValid} // Disable until the form is valid
//                                             className="px-6 py-3 text-base font-semibold text-white bg-[#1a948c]  rounded-full hover:bg-[#343e70] hover:text-white transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#1a948c] focus:outline-none focus:ring-opacity-50"
//                                             onClick={() => setStep(2)} // Move to step 2
//                                         >
//                                             Next
//                                         </Button>
//                                     </div>
//                                 </>
//                             )}
//
//                             {step === 2 && (
//                                 <>
//                                     <div>
//                                         <h4 className="text-gray-800 text-lg mb-4">Review Your Request</h4>
//                                         <p>Employee ID: {values.EmployeeID}</p>
//                                         <p>First Day Away: {values.firstDayAway}</p>
//                                         <p>First Day Back: {values.firstDayBack}</p>
//                                         <p>Vacation Type: {values.vacationType}</p>
//                                         <p>Notes: {values.notes}</p>
//                                     </div>
//
//                                     <div className="mt-8 flex justify-between">
//                                         <Button
//                                             variant="contained"
//                                             className="px-6 py-3 text-base font-semibold text-white bg-gray-400 rounded-full hover:bg-gray-600 hover:text-white transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-gray-400 focus:outline-none focus:ring-opacity-50"
//                                             onClick={() => setStep(1)} // Go back to step 1
//                                         >
//                                             Back
//                                         </Button>
//
//                                         <Button
//                                             variant="contained"
//                                             className="px-6 py-3 text-base font-semibold text-white bg-[#1a948c] rounded-full hover:bg-[#343e70] hover:text-white transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#1a948c] focus:outline-none focus:ring-opacity-50"
//                                             onClick={handleConfirm}
//                                         >
//                                             Submit Request
//                                         </Button>
//                                     </div>
//                                 </>
//                             )}
//                         </Form>
//                     )}
//                 </Formik>
//
//                 {/* Confirmation Dialog */}
//                 <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
//                     <DialogTitle>Submit Request</DialogTitle>
//                     <DialogContent>
//                         <p>Are you sure you want to submit your vacation request?</p>
//                     </DialogContent>
//                     <DialogActions>
//                         <Button
//                             className="px-6 py-3 text-base font-semibold text-white bg-[#1a948c] rounded-full hover:bg-[#343e70] hover:text-white transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#1a948c] focus:outline-none focus:ring-opacity-50"
//                             onClick={() => setOpenConfirm(false)}
//                         >
//                             Cancel
//                         </Button>
//                         <Button
//                             className="px-6 py-3 text-base font-semibold text-white bg-[#1a948c] rounded-full hover:bg-[#343e70] hover:text-white transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#1a948c] focus:outline-none focus:ring-opacity-50"
//                             onClick={handleSubmit}
//                         >
//                             Yes, Submit
//                         </Button>
//                     </DialogActions>
//                 </Dialog>
//             </div>
//         </div>
//     );
// };
//
// export default Requests;

import { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
    Button,
    TextField,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Alert, DialogContentText,
} from "@mui/material";
import * as Yup from "yup";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  //  EmployeeID: Yup.string().required("Employee ID is required"),
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
    const [step, setStep] = useState(1); // Keep track of the step (1 = form, 2 = review)
    const [openConfirm, setOpenConfirm] = useState(false);
    const [successDialog, setSuccessDialog] = useState(false); // For showing success dialog

    const initialValues = {
        EmployeeID: "",
        firstDayAway: "",
        firstDayBack: "",
        vacationType: "",
        notes: "",
    };

    const navigate = useNavigate();
    const ticket = sessionStorage.getItem("ticket"); // Get ticket from localStorage

    const handleConfirm = (submitForm) => {
        setOpenConfirm(true);
        // Pass submitForm as an argument when confirming
        const handleSubmitConfirmation = () => {
            submitForm();
            setOpenConfirm(false);
        };
        // Set confirmation action
        return handleSubmitConfirmation;
    };

    const handleSubmit = async (values) => {
        try {
            // Step 1: Create a draft process
            const firstRequestBody = new URLSearchParams();
            firstRequestBody.append("body", '{"workflow_id":82617}'); // Workflow ID encoded

            const draftProcessResponse = await axios.post(
                "http://xecm.itsolutions.dz:444/otcs/cs.exe/api/v2/draftprocesses",
                firstRequestBody.toString(),
                {
                    headers: {
                        Otcsticket: ticket,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            const draftprocess_id = draftProcessResponse.data.results.draftprocess_id;

            // Step 2: Update the draft process
            const secondRequestBody = new URLSearchParams();
            secondRequestBody.append("body", JSON.stringify({
                action: "formUpdate",
                values: {
                    WorkflowForm_1x4x1x2: sessionStorage.getItem("CardID"),
                    WorkflowForm_1x4x1x9: values.firstDayAway,
                    WorkflowForm_1x4x1x10: values.firstDayBack,
                    WorkflowForm_1x4x1x13: values.vacationType,
                    WorkflowForm_1x4x1x12: values.notes || "",
                }
            }));

            await axios.put(
                `http://xecm.itsolutions.dz:444/otcs/cs.exe/api/v2/draftprocesses/${draftprocess_id}`,
                secondRequestBody.toString(),
                {
                    headers: {
                        Otcsticket: ticket,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            // Step 3: Initiate the process
            const thirdRequestBody = new URLSearchParams();
            thirdRequestBody.append("body", JSON.stringify({
                action: "Initiate",
                comment: "start",
            }));

            await axios.put(
                `http://xecm.itsolutions.dz:444/otcs/cs.exe/api/v2/draftprocesses/${draftprocess_id}`,
                thirdRequestBody.toString(),
                {
                    headers: {
                        Otcsticket: ticket,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            // Show the success dialog and redirect after 2 seconds
            setSuccessDialog(true);
            setTimeout(() => {
                setSuccessDialog(false);
                navigate("/"); // Redirect to homepage
            }, 3500); // 2 seconds delay

            sessionStorage.removeItem('ticket');
        } catch (err) {
            console.error("Error in submitting requests:", err);

        }
    };



    return (
        <div className="font-[sans-serif]">
            <div className="w-[600px]">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, isValid, dirty, submitForm }) => (
                        <Form className="bg-white max-w-xl w-full mx-auto shadow-md p-8 rounded-2xl">
                            <div className="mb-12">
                                <h3 className="text-gray-800 text-3xl font-bold text-center">
                                    Demande de congé
                                </h3>
                            </div>

                            {step === 1 && (
                                <>
                                    {/*<div>*/}
                                    {/*    <label className="text-gray-800 text-xs block mb-2">*/}
                                    {/*        Employee ID*/}
                                    {/*    </label>*/}
                                    {/*    <Field*/}
                                    {/*        as={TextField}*/}
                                    {/*        name="EmployeeID"*/}
                                    {/*        type="password"*/}
                                    {/*        required*/}
                                    {/*        fullWidth*/}
                                    {/*        variant="standard"*/}
                                    {/*        onChange={handleChange}*/}
                                    {/*        placeholder="Scan your card"*/}
                                    {/*        error={touched.EmployeeID && !!errors.EmployeeID}*/}
                                    {/*        helperText={touched.EmployeeID && errors.EmployeeID}*/}
                                    {/*    />*/}
                                    {/*</div>*/}

                                    <div className="mt-8">
                                        <label className="text-gray-800 text-xs block mb-2">
                                            Premier jour d'absence
                                        </label>
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
                                        <label className="text-gray-800 text-xs block mb-2">
                                            Premier jour de Retour
                                        </label>
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
                                        <label className="text-gray-800 text-xs block mb-2">
                                            Type d'absence
                                        </label>
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
                                            <MenuItem value="">Choisie un Type</MenuItem>
                                            <MenuItem value="Vacation">Vacance</MenuItem>
                                            <MenuItem value="Holiday">Voyage</MenuItem>
                                            <MenuItem value="Sick">Maladie</MenuItem>
                                        </Field>
                                    </div>

                                    <div className="mt-8">
                                        <label className="text-gray-800 text-xs block mb-2">
                                            Notes
                                        </label>
                                        <Field
                                            as={TextField}
                                            name="notes"
                                            multiline
                                            rows={4}
                                            fullWidth
                                            variant="standard"
                                            placeholder="Ajoute une note..."
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mt-8 flex justify-center">
                                        <Button
                                            variant="contained"
                                            disabled={!dirty || !isValid}
                                            className="px-6 py-3 text-base font-semibold text-white bg-[#1a948c] rounded-full hover:bg-[#343e70] transition-all duration-300 transform hover:scale-105"
                                            onClick={() => setStep(2)}
                                        >
                                            Suivant
                                        </Button>
                                    </div>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <div className="mb-12">
                                        <h3 className="text-gray-800 text-xl font-bold">
                                            Révisez votre demande
                                        </h3>
                                    </div>

                                    <div>
                                        {/*<p>*/}
                                        {/*    <strong>Employee ID: </strong> {sessionStorage.getItem('User').myRows.Department}*/}
                                        {/*</p>*/}
                                        <p>
                                            <strong>Premier jour d'absence : </strong> {values.firstDayAway}
                                        </p>
                                        <p>
                                            <strong>Premier jour de retour : </strong> {values.firstDayBack}
                                        </p>
                                        <p>
                                            <strong>Type d'absence : </strong> {values.vacationType}
                                        </p>
                                        <p>
                                            <strong>Notes: </strong> {values.notes || "N/A"}
                                        </p>
                                    </div>

                                    <div className=" mt-8 flex justify-center">
                                        <Button
                                             disableElevation
                                             disableRipple
                                             variant="contained"
                                            className="px-6 py-3 text-base font-semibold text-white bg-[#1a948c] rounded-full hover:bg-[#343e70] transition-all duration-300 transform hover:scale-105"
                                            onClick={() => handleConfirm(submitForm)}
                                        >
                                            Envoyer
                                        </Button>
                                    </div>
                                </>
                            )}

                            {/* Confirmation Dialog */}
                            <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
                                <DialogTitle>Envoyer la demande</DialogTitle>
                                <DialogContentText>
                                    <Alert severity="info">Êtes-vous sûr de vouloir soumettre ?</Alert>
                                </DialogContentText>
                                <DialogActions>
                                    <Button onClick={() => setOpenConfirm(false)}>Annuler</Button>
                                    <Button
                                        onClick={() => {
                                            handleConfirm(submitForm)(); // Invoke the function to submit
                                        }}
                                        autoFocus
                                    >
                                        Confirmer
                                    </Button>
                                </DialogActions>
                            </Dialog>

                            {/* Success Dialog */}
                            <Dialog open={successDialog} onClose={() => setSuccessDialog(false)}>
                                <DialogTitle>Succès</DialogTitle>
                                <DialogContent>
                                    <Alert severity="success">Demande de congé soumise avec succès !</Alert>
                                </DialogContent>
                            </Dialog>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Requests;






