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
} from "@mui/material";
import { PictureAsPdf } from "@mui/icons-material";
import { getReviewSections } from "./reviewSections";

const Step6FinalReview = ({ formData, setStep, onSubmitFinal }) => {
  const [agreed, setAgreed] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = () => {
    const payload = new FormData();

    for (const key in formData) {
      if (formData[key] && !(formData[key] instanceof File)) {
        payload.append(key, formData[key]);
      }
    }

    for (const key in formData) {
      if (formData[key] instanceof File) {
        payload.append(key, formData[key]);
      }
    }

    onSubmitFinal(payload);
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
        variant="h6"
        fontWeight="bold"
        mb={3}>
        Final Review & Submit
      </Typography>

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
    </Box>
  );
};

export default Step6FinalReview;
