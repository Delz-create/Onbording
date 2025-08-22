import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PictureAsPdf } from "@mui/icons-material";
import { Snackbar, Alert as MuiAlert } from "@mui/material";
import { getReviewSections } from "./reviewSections";
import successImg from "../../assets/images/successImg.png";

const Step6FinalReview = ({ formData, setStep }) => {
  const infoWeCollect = [
    {
      id: 1,
      text: "Personal Information: We collect personal information such as your name, email address and phone number when you create an account or contact us.",
    },
    {
      id: 2,
      text: "Usage Information: We collect information about your usage of our application including the features you use and the contents you interact with.",
    },
    {
      id: 3,
      text: "Device Information: We collect information about your device including the operating system, device type and IP address.",
    },
  ];

  const infoUsage = [
    {
      id: 1,
      text: "Provide And Improve Our Services: We use your information to provide and improve our services including personalized recommendations and contents.",
    },
    {
      id: 2,
      text: "Communicate With You: We use your information to communicate with you about our services including updates and notifications.",
    },
    {
      id: 3,
      text: "Marketing And Advertising: We use your information to send you marketing and advertising materials including promotional offers and discounts.",
    },
    {
      id: 4,
      text: "Compliance With Laws And Regulations: We use your information to comply with laws and regulations including responding to legal requests and preventing fraud.",
    },
  ];

  const infoShare = [
    {
      id: 1,
      text: "Third-Party Service Providers: We share your information with third-party service providers who work on our behalf to provide services such as data analysis and marketing.",
    },
    {
      id: 2,
      text: "Business Partners: We share your information with business partners who offers services and contents through our application.",
    },
    {
      id: 3,
      text: "Legal Requirement: We share your information when required by law such as in response to a subpoena or court order.",
    },
  ];

  const yourRight = [
    {
      id: 1,
      text: "Access And Correction: You have the right to access and correct your personal information.",
    },
    {
      id: 2,
      text: "Objection: You have the right to object to processing of your personal information.",
    },
  ];
  const [agreed, setAgreed] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const payload = new FormData();
    if (formData.brandLogo?.file)
      payload.append("brandLogo", formData.brandLogo.file);
    if (formData.businessDoc?.file)
      payload.append("businessRegDoc", formData.businessRegDoc.file);
    if (formData.storeImage?.file)
      payload.append("businessPhysicalPic", formData.businessPhysicalPic.file);
    if (formData.govID?.file)
      payload.append("govermentId", formData.govermentId.file);
    if (formData.selfieOrPassport?.file)
      payload.append("passportPhoto", formData.passportPhoto.file);
    if (formData.lookbook?.file)
      payload.append("lookbook", formData.lookbook.file);

    payload.append("businessName", formData.businessName || "");
    payload.append("businessEmail", formData.businessEmail || "");
    payload.append("businessUsername", formData.businessUsername || "");
    payload.append("businessAddress", formData.businessAddress || "");
    payload.append(
      "countryOfRegistration",
      formData.countryOfRegistration || ""
    );

    if (formData.brandTypes?.length) {
      payload.append("brandType", formData.brandTypes.join(", "));
    }
    if (formData.brandDescription) {
      payload.append("brandDescription", formData.brandDescription);
    }
    if (formData.tagline) {
      payload.append("brandTagline", formData.brandTagline);
    }
    if (formData.brandWebsite) {
      payload.append("brandWebsite", formData.brandWebsite);
    }

    if (formData.socialLinks?.facebook) {
      payload.append("facebook", formData.socialLinks.facebook);
    }
    if (formData.socialLinks?.tiktok) {
      payload.append("tiktok", formData.socialLinks.tiktok);
    }
    if (formData.socialLinks?.instagram) {
      payload.append("instagram", formData.socialLinks.instagram);
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setSnackbar({
        open: true,
        message: "Session expired. Please login again!",
        severity: "error",
      });
      localStorage.removeItem("onboardingData");
      setTimeout(() => navigate("/signin"), 1500);
      return;
    }

    try {
      const res = await fetch("https://api.pozse.com/api/v1/business/submit", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      const data = await res.json();
      console.log("Submission result:", data);

      if (res.ok) {
        setOpenDialog(false);
        setSuccessOpen(true);

        localStorage.setItem("onboardingCompleted", "true");

        localStorage.removeItem("onboardingData");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setSnackbar({
          open: true,
          message: data.message || "Submission failed",
          severity: "error",
        });
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSnackbar({
        open: true,
        message: "An error occured while submitting!",
        severity: "error",
      });
    }
  };

  const renderFile = (fileData) => {
    if (!fileData) return "—";

    if (fileData?.preview) {
      const type = fileData.file?.type?.toLowerCase() || "";
      if (type.includes("pdf")) {
        return (
          <Box
            display="flex"
            alignItems="center"
            gap={1}>
            <PictureAsPdf color="error" />
            <Typography variant="body2">{fileData.file.name}</Typography>
          </Box>
        );
      }
      if (type.includes("image")) {
        return (
          <img
            src={fileData.preview}
            alt="Preview"
            style={{
              maxWidth: "120px",
              maxHeight: "120px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        );
      }
    }

    if (typeof fileData === "string") {
      if (fileData.toLowerCase().endsWith(".pdf")) {
        return (
          <Box
            display="flex"
            alignItems="center"
            gap={1}>
            <PictureAsPdf color="error" />
            <Typography variant="body2">{fileData.split("/").pop()}</Typography>
          </Box>
        );
      }
      return (
        <img
          src={fileData}
          alt="Preview"
          style={{
            maxWidth: "120px",
            maxHeight: "120px",
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
      );
    }

    if (fileData instanceof File) {
      const type = fileData.type?.toLowerCase() || "";
      if (type.includes("pdf")) {
        return (
          <Box
            display="flex"
            alignItems="center"
            gap={1}>
            <PictureAsPdf color="error" />
            <Typography variant="body2">{fileData.name}</Typography>
          </Box>
        );
      }
      if (type.includes("image")) {
        return (
          <img
            src={URL.createObjectURL(fileData)}
            alt="Preview"
            style={{
              maxWidth: "120px",
              maxHeight: "120px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        );
      }
    }

    return <Typography variant="body2">{fileData.name || "—"}</Typography>;
  };

  const sections = getReviewSections(formData);

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        sx={{ textAlign: "center" }}>
        Terms Agreement
      </Typography>

      <Box>
        <Typography
          varient="h6"
          fontWeight="bold"
          mb={3}
          sx={{ fontFamily: "Poppins" }}>
          Introduction
        </Typography>

        <Typography
          mb={3}
          sx={{ fontFamily: "Poppins" }}>
          We respect your privacy and are committed to protecting your personal
          information. This privacy policy explains how we collect, use and
          disclose your information when you use our application and services.
        </Typography>

        <Typography
          varient="h6"
          fontWeight="bold"
          mb={3}
          sx={{ fontFamily: "Poppins" }}>
          Information We Collect
        </Typography>

        <Typography
          mb={3}
          sx={{ fontFamily: "Poppins" }}>
          <List>
            {infoWeCollect.map((infos) => (
              <ListItem key={infos.id}>
                <ListItemText
                  sx={{ fontFamily: "Poppins" }}
                  primary={infos.text}
                />
              </ListItem>
            ))}
          </List>
        </Typography>

        <Typography
          varient="h6"
          fontWeight="bold"
          mb={3}
          sx={{ fontFamily: "Poppins" }}>
          How We Use Your Information
        </Typography>

        <Typography
          mb={3}
          sx={{ fontFamily: "Poppins" }}>
          <List>
            {infoUsage.map((infos) => (
              <ListItem key={infos.id}>
                <ListItemText primary={infos.text} />
              </ListItem>
            ))}
          </List>
        </Typography>

        <Typography
          varient="h6"
          fontWeight="bold"
          mb={3}
          sx={{ fontFamily: "Poppins" }}>
          How we share your information
        </Typography>

        <Typography
          mb={3}
          sx={{ fontFamily: "Poppins" }}>
          <List>
            {infoShare.map((infos) => (
              <ListItem key={infos.id}>
                <ListItemText primary={infos.text} />
              </ListItem>
            ))}
          </List>
        </Typography>

        <Typography
          varient="h6"
          fontWeight="bold"
          mb={3}
          sx={{ fontFamily: "Poppins" }}>
          Data Security
        </Typography>

        <Typography
          mb={3}
          sx={{ fontFamily: "Poppins" }}>
          We take reasonable measures to protects your information from
          unauthorized access, use and disclosure including encryption and
          secure socket layer (SSL) technology.
        </Typography>

        <Typography
          varient="h6"
          fontWeight="bold"
          mb={3}
          sx={{ fontFamily: "Poppins" }}>
          Data Retention
        </Typography>

        <Typography
          mb={3}
          sx={{ fontFamily: "Poppins" }}>
          We retain your information for as long as necessary to provide our
          services and comply with legal requirements.
        </Typography>

        <Typography
          varient="h6"
          fontWeight="bold"
          mb={3}
          sx={{ fontFamily: "Poppins" }}>
          Your Rights
        </Typography>

        <Typography
          mb={3}
          sx={{ fontFamily: "Poppins" }}>
          <List>
            {yourRight.map((rights) => (
              <ListItem key={rights.id}>
                <ListItemText primary={rights.text} />
              </ListItem>
            ))}
          </List>
        </Typography>

        <Typography
          varient="h6"
          fontWeight="bold"
          mb={3}
          sx={{ fontFamily: "Poppins" }}>
          Changes To This Privacy Policy
        </Typography>

        <Typography
          mb={3}
          sx={{ fontFamily: "Poppins" }}>
          We may update this privacy policy from time to time. We will notify
          you of any significant changes by posting a notice on our application
          or website.
        </Typography>

        <Typography
          varient="h6"
          fontWeight="bold"
          mb={3}
          sx={{ fontFamily: "Poppins" }}>
          Contact Us
        </Typography>

        <Typography
          mb={3}
          sx={{ fontFamily: "Poppins" }}>
          If you have any questions or concerns about this privacy policy,
          please contact us at Pozse@gmail.com
        </Typography>
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            sx={{
              color: "red",
              "&.Mui-checked": { color: "red" },
            }}
          />
        }
        label="I agree to the Terms & Conditions"
      />

      <Button
        variant="outlined"
        onClick={() => setOpenDialog(true)}>
        Preview & Submit
      </Button>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth>
        <DialogTitle>Review Your Information</DialogTitle>
        <DialogContent dividers>
          {sections.map((section, idx) => (
            <Box
              key={idx}
              mb={3}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center">
                <Typography
                  variant="subtitle1"
                  fontWeight="bold">
                  {section.title}
                </Typography>
                <Button
                  size="small"
                  onClick={() => {
                    setOpenDialog(false);
                    setTimeout(() => {
                      setStep(section.step);
                    }, 0);
                  }}>
                  Edit
                </Button>
              </Box>
              <Divider sx={{ my: 1 }} />
              {section.fields.map((field, fIdx) => (
                <Box
                  key={fIdx}
                  mb={1}>
                  <Typography
                    variant="body2"
                    fontWeight="bold">
                    {field.label}:
                  </Typography>
                  {field.file ? (
                    renderFile(field.file)
                  ) : (
                    <Typography variant="body2">
                      {field.value || "—"}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!agreed}
            onClick={handleSubmit}
            sx={{
              backgroundColor: "red",
              "&:hover": { backgroundColor: "#b71c1c" },
            }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        maxWidth="sm"
        fullWidth>
        <DialogContent sx={{ textAlign: "center", p: 4 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom>
            You have successfully submitted your form
          </Typography>

          <Typography
            variant="body1"
            sx={{ mb: 3 }}>
            This is your official confirmation. Thanks for submitting your{" "}
            <span style={{ color: "red", fontWeight: 600 }}>brand details</span>
            ! Our team is reviewing your information. Expect an update within
            24–48 hours.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src={successImg}
              alt="Submission Success"
              style={{ maxWidth: 260, height: "auto" }}
            />
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <MuiAlert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default Step6FinalReview;
