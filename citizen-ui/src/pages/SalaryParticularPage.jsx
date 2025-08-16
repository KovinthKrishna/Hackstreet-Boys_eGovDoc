import React from "react";
import { useSalaryForm } from "../hooks/UseSalaryForm";
import { useScrollHeader } from "../hooks/UseScrollHeader";

import ProgressIndicator from "../components/ui/ProgressIndicator";
import PersonalInformationStep from "../components/Steps/PersonalInformationStep";
import AdditionalInformationStep from "../components/Steps/AdditionalInformationStep";
import NavigationButtons from "../components/NavigationButtons";
import { useNavigate } from "react-router-dom";
const SalaryParticularPage = () => {
  const {
    currentStep,
    formData,
    handleInputChange,
    nextStep,
    prevStep,
    resetForm,
  } = useSalaryForm();

  const { formRef, scrolled } = useScrollHeader();

  const navigate = useNavigate();

  const handleBack = () => {
    if (currentStep === 1) {
      navigate("/");
    } else {
      prevStep();
    }
  };

  const handleNext = () => {
    nextStep();
  };

  const handleCancel = () => {
    resetForm();
    navigate("/");
  };

  const handleSubmit = () => {
    console.log("Submit Request:", formData);
    resetForm();
    navigate("/");
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center p-4"
      style={{ background: "#3A66A3" }}
    >
      <div
        className="relative flex w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-white/10 shadow-2xl backdrop-blur-sm"
        style={{ height: "812px", width: "375px" }}
      >
        {/* Header */}
        <div className="py-6 text-center">
          <h1 className="text-2xl font-bold text-black">Salary Particular</h1>
          <ProgressIndicator currentStep={currentStep} totalSteps={2} />
        </div>

        {/* Form Container */}
        <div ref={formRef} className="flex-1 overflow-hidden px-6">
          <div className="h-full overflow-y-auto rounded-3xl bg-white/20 p-6 shadow-lg backdrop-blur-sm">
            {!scrolled && (
              <h2 className="mb-6 py-2 text-lg font-semibold text-black">
                {currentStep === 1
                  ? "Personal Information"
                  : "Additional Information"}
              </h2>
            )}

            {currentStep === 1 ? (
              <PersonalInformationStep
                formData={formData}
                handleInputChange={handleInputChange}
              />
            ) : (
              <AdditionalInformationStep
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3 px-6 py-4">
          <NavigationButtons
            currentStep={currentStep}
            onBack={handleBack}
            onNext={handleNext}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            canSubmit={formData.informationAccurate}
          />
        </div>
      </div>
    </div>
  );
};

export default SalaryParticularPage;
