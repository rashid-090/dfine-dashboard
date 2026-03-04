'use client';
import React, { useState, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Upload, X } from "lucide-react";
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';

const CompanyProfilePage = () => {
  const [deleteCheckbox, setDeleteCheckbox] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    companyName: "DFINE DENTAL LAB",
    tinNo: "0",
    contactPerson: "Mr. Harshin",
    cstNo: "",
    addressLine1: "office 102 Zone no. 24 Street no. 840",
    gstNo: "",
    branch: "Qatar",
    panNo: "",
    addressLine2: "Al Muntazah Area",
    state: "Doha",
    city: "Qatar",
    phoneNo: "+974-30266007",
    pincode: "22368",
    emailId: "dentallabdentcare@gmail.com",
    mobileNo: "+974-40374156",
    landmark: "Account Number : 4810765388001",
    labName: "Dfine Dental Lab",
    ifscCode: "CBQAQQAA",
    bankName: "Commercial Bank of Qatar",
    bankDetails: "Bank Details :",
    branchName: "MAIN BRANCH",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 400 * 1024) {
        toast.error("Image size should not exceed 400 KB");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.companyName || !formData.contactPerson || !formData.addressLine1 || !formData.city || !formData.pincode) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Company profile saved successfully");
  };

  const handleDeleteImage = () => {
    if (deleteCheckbox) {
      setImagePreview(null);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setDeleteCheckbox(false);
      toast.success("Image removed");
    } else {
      toast.error("Please check the checkbox to remove the image");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-background">
      <Toaster position="bottom-right" />
      
      {/* Main Header - Company Profile */}
      <div className="border-b pb-2">
        <h1 className="text-3xl font-semibold text-foreground">Company Profile</h1>
      </div>

      {/* Logo Upload Section */}
      <div className="border p-6 space-y-4">
        <div className="flex items-start gap-4">
          <Label className="w-32 mt-2 font-medium">Upload Logo</Label>
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="rounded-none border-gray-300"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" /> Choose file
              </Button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              <span className="text-sm text-muted-foreground">{selectedFile ? selectedFile.name : "No file chosen"}</span>
            </div>
            
            {/* Image Preview */}
            {imagePreview && (
              <div className="relative w-32 h-32 border">
                <Image src={imagePreview} alt="Preview" fill className="object-contain" />
              </div>
            )}
            
            <p className="text-xs text-muted-foreground">Image maximum size 400 kb</p>
            
            {/* Delete Section - Only visible when image is available */}
            {imagePreview && (
              <div className="flex items-center gap-6 pt-2 border-t border-gray-100 mt-4">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="del" 
                    checked={deleteCheckbox} 
                    onCheckedChange={setDeleteCheckbox}
                    className="rounded-sm border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label htmlFor="del" className="text-sm font-normal">Delete</Label>
                </div>
                <Button 
                  variant="outline" 
                  className="rounded-none border-gray-300"
                  onClick={handleDeleteImage}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Remove Image
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Branch Settings Header */}
      <div className="pt-2">
        <h2 className="text-2xl font-semibold text-foreground">Branch Settings</h2>
      </div>

      {/* Form Fields Section */}
      <div className="border p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          
          {/* Column 1 */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="font-medium">Company name<span className="text-red-500 ml-0.5">*</span></Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300" 
                value={formData.companyName} 
                onChange={(e) => handleChange('companyName', e.target.value)} 
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="font-medium">Contact person name<span className="text-red-500 ml-0.5">*</span></Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300" 
                value={formData.contactPerson} 
                onChange={(e) => handleChange('contactPerson', e.target.value)} 
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="font-medium">Address Line 1<span className="text-red-500 ml-0.5">*</span></Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300" 
                value={formData.addressLine1} 
                onChange={(e) => handleChange('addressLine1', e.target.value)} 
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="font-medium">Branch</Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300" 
                value={formData.branch} 
                onChange={(e) => handleChange('branch', e.target.value)} 
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="font-medium">Address Line 2</Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300" 
                value={formData.addressLine2} 
                onChange={(e) => handleChange('addressLine2', e.target.value)} 
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="font-medium">State</Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300" 
                value={formData.state} 
                onChange={(e) => handleChange('state', e.target.value)} 
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="font-medium">Phone No</Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300" 
                value={formData.phoneNo} 
                onChange={(e) => handleChange('phoneNo', e.target.value)} 
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="font-medium">Email Id</Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300" 
                type="email"
                value={formData.emailId} 
                onChange={(e) => handleChange('emailId', e.target.value)} 
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="font-medium">Landmark</Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300" 
                value={formData.landmark} 
                onChange={(e) => handleChange('landmark', e.target.value)} 
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="font-medium">TIN No.</Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300" 
                value={formData.tinNo} 
                onChange={(e) => handleChange('tinNo', e.target.value)} 
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="font-medium">CST No.</Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300" 
                value={formData.cstNo} 
                onChange={(e) => handleChange('cstNo', e.target.value)} 
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="font-medium">GST No.</Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300" 
                value={formData.gstNo} 
                onChange={(e) => handleChange('gstNo', e.target.value)} 
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="font-medium">PAN No.</Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300" 
                value={formData.panNo} 
                onChange={(e) => handleChange('panNo', e.target.value)} 
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="font-medium">City<span className="text-red-500 ml-0.5">*</span></Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300" 
                value={formData.city} 
                onChange={(e) => handleChange('city', e.target.value)} 
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="font-medium">Pincode<span className="text-red-500 ml-0.5">*</span></Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300" 
                value={formData.pincode} 
                onChange={(e) => handleChange('pincode', e.target.value)} 
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="font-medium">Mobile No</Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300" 
                value={formData.mobileNo} 
                onChange={(e) => handleChange('mobileNo', e.target.value)} 
              />
            </div>
          </div>
        </div>

        {/* Bank Details Section */}
        <div className="mt-8 pt-6 border-t space-y-4">
          <h3 className="text-lg font-medium text-foreground mb-4">Bank Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="font-medium">Name of Lab:</Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300" 
                value={formData.labName} 
                onChange={(e) => handleChange('labName', e.target.value)} 
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="font-medium">IFSC Code</Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300" 
                value={formData.ifscCode} 
                onChange={(e) => handleChange('ifscCode', e.target.value)} 
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="font-medium">Bank Name:</Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300" 
                value={formData.bankName} 
                onChange={(e) => handleChange('bankName', e.target.value)} 
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="font-medium">Branch:</Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300" 
                value={formData.branchName} 
                onChange={(e) => handleChange('branchName', e.target.value)} 
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="font-medium">Bank Details</Label>
              <Input 
                className="col-span-2 rounded-none bg-muted border-border" 
                value={formData.bankDetails} 
                readOnly 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4">
        <Button 
          className="bg-primary text-primary-foreground hover:bg-primary/80 rounded-none px-12 py-3 font-medium"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>

      {/* Help text for required fields */}
      <p className="text-xs text-muted-foreground mt-2">* Required fields</p>
    </div>
  );
};

export default CompanyProfilePage;