import React, { useState, useRef, useEffect } from "react";
import { Calendar, Upload } from "lucide-react";

export default function TravelWarrantForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    pensionNumber: "",
    paymentPlace: "",
    retirementDate: "",
    annualSalary: "",
    travelClass: "",
    maritalStatus: "",
    ticketType: "",
    carType: "",
    dependantChildren: "",
    childrenAges: "",
    fromStation: "",
    toStation: "",
    outwardJourneyDate: "",
    returnJourneyDate: "",
    priorityLevel: "",
    appointmentDate: "",
    appointmentTime: "",
    spouseName: "",
    spouseDepartment: "",
    informationAccurate: false,
  });

  const [timeSlots, setTimeSlots] = useState([]);
  const [loadingTimeSlots, setLoadingTimeSlots] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Function to fetch time slots from backend
  const fetchTimeSlots = async (date) => {
    setLoadingTimeSlots(true);
    try {
      // Simulate API call - replace with your actual backend endpoint
      const response = await fetch(`/api/time-slots?date=${date}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTimeSlots(data.timeSlots || []);
      } else {
        console.error("Failed to fetch time slots");
        // Fallback to default time slots if API fails
        setTimeSlots([
          { value: "09:00-09:30", label: "09:00 - 09:30" },
          { value: "09:30-10:00", label: "09:30 - 10:00" },
          { value: "10:00-10:30", label: "10:00 - 10:30" },
          { value: "10:30-11:00", label: "10:30 - 11:00" },
          { value: "11:00-11:30", label: "11:00 - 11:30" },
          { value: "11:30-12:00", label: "11:30 - 12:00" },
          { value: "12:00-12:30", label: "12:00 - 12:30" },
          { value: "12:30-13:00", label: "12:30 - 13:00" },
          { value: "13:00-13:30", label: "13:00 - 13:30" },
          { value: "13:30-14:00", label: "13:30 - 14:00" },
          { value: "14:00-14:30", label: "14:00 - 14:30" },
          { value: "14:30-15:00", label: "14:30 - 15:00" },
          { value: "15:00-15:30", label: "15:00 - 15:30" },
          { value: "15:30-16:00", label: "15:30 - 16:00" },
          { value: "16:00-16:30", label: "16:00 - 16:30" },
          { value: "16:30-17:00", label: "16:30 - 17:00" },
        ]);
      }
    } catch (error) {
      console.error("Error fetching time slots:", error);
      // Fallback to default time slots if API fails
      setTimeSlots([
        { value: "09:00-09:30", label: "09:00 - 09:30" },
        { value: "09:30-10:00", label: "09:30 - 10:00" },
        { value: "10:00-10:30", label: "10:00 - 10:30" },
        { value: "10:30-11:00", label: "10:30 - 11:00" },
        { value: "11:00-11:30", label: "11:00 - 11:30" },
        { value: "11:30-12:00", label: "11:30 - 12:00" },
        { value: "12:00-12:30", label: "12:00 - 12:30" },
        { value: "12:30-13:00", label: "12:30 - 13:00" },
        { value: "13:00-13:30", label: "13:00 - 13:30" },
        { value: "13:30-14:00", label: "13:30 - 14:00" },
        { value: "14:00-14:30", label: "14:00 - 14:30" },
        { value: "14:30-15:00", label: "14:30 - 15:00" },
        { value: "15:00-15:30", label: "15:00 - 15:30" },
        { value: "15:30-16:00", label: "15:30 - 16:00" },
        { value: "16:00-16:30", label: "16:00 - 16:30" },
        { value: "16:30-17:00", label: "16:30 - 17:00" },
      ]);
    } finally {
      setLoadingTimeSlots(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // If appointment date changes, fetch new time slots and reset selected time
    if (field === "appointmentDate") {
      if (value) {
        fetchTimeSlots(value);
        // Reset the selected time slot when date changes
        setFormData((prev) => ({
          ...prev,
          appointmentTime: "",
        }));
      } else {
        // Clear time slots if no date is selected
        setTimeSlots([]);
        setFormData((prev) => ({
          ...prev,
          appointmentTime: "",
        }));
      }
    }
  };

  const handleBack = () => {
    console.log("Back button clicked");
  };

  const handleCancelRequest = () => {
    console.log("Cancel the Request clicked");
  };

  const handleSubmitRequest = () => {
    console.log("Submit the Request clicked", formData);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const pdfFiles = files.filter((file) => file.type === "application/pdf");

    if (pdfFiles.length === 0) {
      alert("Please select PDF files only.");
      return;
    }

    setUploading(true);

    try {
      for (const file of pdfFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "supporting_document");

        // Replace with your actual upload endpoint
        const response = await fetch("/api/upload-document", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          setUploadedFiles((prev) => [
            ...prev,
            {
              name: file.name,
              size: file.size,
              uploadedAt: new Date().toISOString(),
              fileId: result.fileId || Date.now().toString(),
              url: result.url,
            },
          ]);
        } else {
          throw new Error(`Failed to upload ${file.name}`);
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
      // Clear the file input
      event.target.value = "";
    }
  };

  const handleFileRemove = (fileId) => {
    setUploadedFiles((prev) => prev.filter((file) => file.fileId !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Ref and state for hiding the heading on scroll
  const formRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (formRef.current.scrollTop > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const formEl = formRef.current;
    formEl.addEventListener("scroll", handleScroll);

    return () => formEl.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-blue-100 to-blue-300 shadow-2xl">
      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 py-3 font-medium text-black">
        <span>9:41</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="h-1 w-1 rounded-full bg-black"></div>
            <div className="h-1 w-1 rounded-full bg-black"></div>
            <div className="h-1 w-1 rounded-full bg-black"></div>
            <div className="h-1 w-1 rounded-full bg-black"></div>
          </div>
          <div className="h-3 w-6 rounded-sm border border-black">
            <div className="m-0.5 h-2 w-4 rounded-sm bg-black"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="py-6 text-center">
        <h1 className="text-2xl font-bold text-black">Travel Warrant</h1>
      </div>

      {/* Form Container with Scrolling */}
      <div ref={formRef} className="flex-1 overflow-hidden px-6">
        <div className="h-full overflow-y-auto rounded-3xl bg-white/20 p-6 shadow-lg backdrop-blur-sm">
          {/* Conditionally render the heading */}
          {!scrolled && (
            <h2 className="mb-6 py-2 text-lg font-semibold text-black">
              Personal Information
            </h2>
          )}

          <div className="space-y-5 pb-4">
            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="w-full rounded-lg border-0 bg-white/30 px-4 py-3 text-black placeholder-gray-600 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder=""
              />
            </div>

            {/* Pension/W.&O.P No */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black">
                Pension/W.&O.P No
              </label>
              <input
                type="text"
                value={formData.pensionNumber}
                onChange={(e) =>
                  handleInputChange("pensionNumber", e.target.value)
                }
                className="w-full rounded-lg border-0 bg-white/30 px-4 py-3 text-black placeholder-gray-600 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder=""
              />
            </div>

            {/* Place Of payment pension */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black">
                Place Of payment pension:
              </label>
              <input
                type="text"
                value={formData.paymentPlace}
                onChange={(e) =>
                  handleInputChange("paymentPlace", e.target.value)
                }
                className="w-full rounded-lg border-0 bg-white/30 px-4 py-3 text-black placeholder-gray-600 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder=""
              />
            </div>

            {/* Date of retirement */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black">
                Date of retirement
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.retirementDate}
                  onChange={(e) =>
                    handleInputChange("retirementDate", e.target.value)
                  }
                  className="w-full appearance-none rounded-lg border-0 bg-white/30 px-4 py-3 text-black placeholder-gray-600 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <Calendar className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 transform text-gray-600" />
              </div>
            </div>

            {/* Annual salary at date of retirement */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black">
                Annual salary at date of retirement
              </label>
              <input
                type="text"
                value={formData.annualSalary}
                onChange={(e) =>
                  handleInputChange("annualSalary", e.target.value)
                }
                className="w-full rounded-lg border-0 bg-white/30 px-4 py-3 text-black placeholder-gray-600 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder=""
              />
            </div>

            {/* Class Of travel */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black">
                Class Of travel you were entitled to at the date of retirement
              </label>
              <select
                value={formData.travelClass}
                onChange={(e) =>
                  handleInputChange("travelClass", e.target.value)
                }
                className="w-full rounded-lg border-0 bg-white/30 px-4 py-3 text-black backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Select class</option>
                <option value="first">First Class</option>
                <option value="business">Business Class</option>
                <option value="economy">Economy Class</option>
              </select>
            </div>

            {/* Current Marital status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black">
                Current Marital status
              </label>
              <select
                value={formData.maritalStatus}
                onChange={(e) =>
                  handleInputChange("maritalStatus", e.target.value)
                }
                className="w-full rounded-lg border-0 bg-white/30 px-4 py-3 text-black backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Select status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>

            {/* Ticket Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black">
                State whether you require ordinary single or ordinary return
              </label>
              <select
                value={formData.ticketType}
                onChange={(e) =>
                  handleInputChange("ticketType", e.target.value)
                }
                className="w-full rounded-lg border-0 bg-white/30 px-4 py-3 text-black backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Select ticket type</option>
                <option value="ordinary-single">Ordinary Single</option>
                <option value="ordinary-return">Ordinary Return</option>
              </select>
            </div>

            {/* Car Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black">
                Sleeperette / Sleeping Car / Observation Car
              </label>
              <select
                value={formData.carType}
                onChange={(e) => handleInputChange("carType", e.target.value)}
                className="w-full rounded-lg border-0 bg-white/30 px-4 py-3 text-black backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Select car type</option>
                <option value="sleeperette">Sleeperette</option>
                <option value="sleeping-car">Sleeping Car</option>
                <option value="observation-car">Observation Car</option>
                <option value="none">None</option>
              </select>
            </div>

            {/* Name of Dependant children */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black">
                Name of Dependant children
              </label>
              <textarea
                value={formData.dependantChildren}
                onChange={(e) =>
                  handleInputChange("dependantChildren", e.target.value)
                }
                rows="3"
                className="w-full resize-none rounded-lg border-0 bg-white/30 px-4 py-3 text-black placeholder-gray-600 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter names of dependent children (one per line)"
              />
            </div>

            {/* Age of Dependant children */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black">
                Age of Dependant children
              </label>
              <textarea
                value={formData.childrenAges}
                onChange={(e) =>
                  handleInputChange("childrenAges", e.target.value)
                }
                rows="3"
                className="w-full resize-none rounded-lg border-0 bg-white/30 px-4 py-3 text-black placeholder-gray-600 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter ages corresponding to the children above (one per line)"
              />
            </div>

            {/* Journey Details Section */}
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-black">
                Journey Details
              </h3>

              {/* From Station */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-black">
                  From Station
                </label>
                <input
                  type="text"
                  value={formData.fromStation}
                  onChange={(e) =>
                    handleInputChange("fromStation", e.target.value)
                  }
                  className="w-full rounded-lg border-0 bg-white/30 px-4 py-3 text-black placeholder-gray-600 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder=""
                />
              </div>

              {/* To Station */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-black">
                  To Station
                </label>
                <input
                  type="text"
                  value={formData.toStation}
                  onChange={(e) =>
                    handleInputChange("toStation", e.target.value)
                  }
                  className="w-full rounded-lg border-0 bg-white/30 px-4 py-3 text-black placeholder-gray-600 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder=""
                />
              </div>

              {/* Date Of Outward Journey */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-black">
                  Date Of Outward Journey
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.outwardJourneyDate}
                    onChange={(e) =>
                      handleInputChange("outwardJourneyDate", e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border-0 bg-white/30 px-4 py-3 text-black placeholder-gray-600 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                  <Calendar className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 transform text-gray-600" />
                </div>
              </div>

              {/* Date of Return Journey */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-black">
                  Date of Return Journey
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.returnJourneyDate}
                    onChange={(e) =>
                      handleInputChange("returnJourneyDate", e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border-0 bg-white/30 px-4 py-3 text-black placeholder-gray-600 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                  <Calendar className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 transform text-gray-600" />
                </div>
              </div>

              {/* Priority Level */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-black">
                  Priority Level
                </label>
                <select
                  value={formData.priorityLevel}
                  onChange={(e) =>
                    handleInputChange("priorityLevel", e.target.value)
                  }
                  className="w-full rounded-lg border-0 bg-white/30 px-4 py-3 text-black backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="">Select priority level</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              {/* Appointment Date */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-black">
                  Appointment Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.appointmentDate}
                    onChange={(e) =>
                      handleInputChange("appointmentDate", e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border-0 bg-white/30 px-4 py-3 text-black placeholder-gray-600 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                  <Calendar className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 transform text-gray-600" />
                </div>
              </div>

              {/* Time Slot Selection */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-black">
                  Time Slot
                </label>
                <select
                  value={formData.appointmentTime}
                  onChange={(e) =>
                    handleInputChange("appointmentTime", e.target.value)
                  }
                  className="w-full rounded-lg border-0 bg-white/30 px-4 py-3 text-black backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  disabled={!formData.appointmentDate || loadingTimeSlots}
                >
                  <option value="">
                    {loadingTimeSlots
                      ? "Loading time slots..."
                      : "Select time slot"}
                  </option>
                  {timeSlots.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </select>
                {!formData.appointmentDate && !loadingTimeSlots && (
                  <p className="mt-1 text-xs text-gray-600">
                    Please select an appointment date first
                  </p>
                )}
                {loadingTimeSlots && (
                  <p className="mt-1 text-xs text-blue-600">
                    Loading available time slots...
                  </p>
                )}
              </div>
            </div>

            {/* Supporting Documents Section */}
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-black">
                Supporting Documents
              </h3>

              {/* File Upload Area */}
              <div
                onClick={handleFileUpload}
                className={`w-full cursor-pointer rounded-lg border-2 border-dashed border-gray-400 bg-white/20 p-8 text-center backdrop-blur-sm transition-colors hover:border-gray-500 ${uploading ? "cursor-not-allowed opacity-50" : ""}`}
              >
                <Upload className="mx-auto mb-2 h-8 w-8 text-gray-600" />
                <p className="text-sm text-gray-700">
                  {uploading ? "Uploading..." : "Click to upload PDF documents"}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Only PDF files are allowed
                </p>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="mb-2 text-sm font-medium text-black">
                    Uploaded Documents:
                  </h4>
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.fileId}
                      className="flex items-center justify-between rounded-lg bg-white/30 p-3 backdrop-blur-sm"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
                          <span className="text-xs font-bold text-red-600">
                            PDF
                          </span>
                        </div>
                        <div>
                          <p className="max-w-48 truncate text-sm font-medium text-black">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFileRemove(file.fileId);
                        }}
                        className="rounded px-2 py-1 text-sm font-medium text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* If Spouse is also a Pensioner Section */}
            <div className="mt-6">
              <h3 className="mb-4 text-lg font-semibold text-black">
                If Spouse is also a Pensioner
              </h3>

              {/* Spouse Name */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-black">
                  Spouse Name
                </label>
                <input
                  type="text"
                  value={formData.spouseName}
                  onChange={(e) =>
                    handleInputChange("spouseName", e.target.value)
                  }
                  className="w-full rounded-lg border-0 bg-white/30 px-4 py-3 text-black placeholder-gray-600 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder=""
                />
              </div>

              {/* Department of which spouse is employed */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-black">
                  Department of which spouse is employed
                </label>
                <input
                  type="text"
                  value={formData.spouseDepartment}
                  onChange={(e) =>
                    handleInputChange("spouseDepartment", e.target.value)
                  }
                  className="w-full rounded-lg border-0 bg-white/30 px-4 py-3 text-black placeholder-gray-600 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder=""
                />
              </div>

              {/* Checkbox */}
              <div className="mb-6">
                <label className="flex cursor-pointer items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.informationAccurate}
                    onChange={(e) =>
                      handleInputChange("informationAccurate", e.target.checked)
                    }
                    className="mt-1 h-4 w-4 rounded border-gray-400 bg-white/30 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm leading-5 text-black">
                    I confirm that all information provided is accurate and
                    complete
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Navigation Buttons */}
      <div className="space-y-3 px-6 py-4">
        <button
          onClick={handleBack}
          className="w-full rounded-full bg-white/30 py-3 font-medium text-black backdrop-blur-sm transition-colors hover:bg-white/40 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Back
        </button>
        <button
          onClick={handleCancelRequest}
          className="w-full rounded-full bg-white/30 py-3 font-medium text-black backdrop-blur-sm transition-colors hover:bg-white/40 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Cancel the Request
        </button>
        <button
          onClick={handleSubmitRequest}
          className="w-full rounded-full bg-white/30 py-3 font-medium text-black backdrop-blur-sm transition-colors hover:bg-white/40 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Submit the Request
        </button>
      </div>

      {/* Home Indicator */}
      <div className="flex justify-center pb-2">
        <div className="h-1 w-32 rounded-full bg-black/30"></div>
      </div>
    </div>
  );
}
