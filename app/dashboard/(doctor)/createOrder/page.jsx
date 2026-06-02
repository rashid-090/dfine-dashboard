'use client';
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Minus, Calendar, User, UploadCloud } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const toothArray = [
  // Upper Right I (18 - 11)
  { id: 18, image: '/teeths/18.png', flip: false },
  { id: 17, image: '/teeths/17.png', flip: false },
  { id: 16, image: '/teeths/16.png', flip: false },
  { id: 15, image: '/teeths/15.png', flip: false },
  { id: 14, image: '/teeths/14.png', flip: false },
  { id: 13, image: '/teeths/13.png', flip: false },
  { id: 12, image: '/teeths/12.png', flip: false },
  { id: 11, image: '/teeths/11.png', flip: false },

  // Upper Left II (21 - 28) - mapped to 11.png - 18.png with scale-x-[-1]
  { id: 21, image: '/teeths/11.png', flip: true },
  { id: 22, image: '/teeths/12.png', flip: true },
  { id: 23, image: '/teeths/13.png', flip: true },
  { id: 24, image: '/teeths/14.png', flip: true },
  { id: 25, image: '/teeths/15.png', flip: true },
  { id: 26, image: '/teeths/16.png', flip: true },
  { id: 27, image: '/teeths/17.png', flip: true },
  { id: 28, image: '/teeths/18.png', flip: true },

  // Lower Left III (31 - 38) - mapped to 41.png - 48.png with scale-x-[-1]
  { id: 31, image: '/teeths/41.png', flip: true },
  { id: 32, image: '/teeths/42.png', flip: true },
  { id: 33, image: '/teeths/43.png', flip: true },
  { id: 34, image: '/teeths/44.png', flip: true },
  { id: 35, image: '/teeths/45.png', flip: true },
  { id: 36, image: '/teeths/46.png', flip: true },
  { id: 37, image: '/teeths/47.png', flip: true },
  { id: 38, image: '/teeths/48.png', flip: true },

  // Lower Right IV (48 - 41)
  { id: 48, image: '/teeths/48.png', flip: false },
  { id: 47, image: '/teeths/47.png', flip: false },
  { id: 46, image: '/teeths/46.png', flip: false },
  { id: 45, image: '/teeths/45.png', flip: false },
  { id: 44, image: '/teeths/44.png', flip: false },
  { id: 43, image: '/teeths/43.png', flip: false },
  { id: 42, image: '/teeths/42.png', flip: false },
  { id: 41, image: '/teeths/41.png', flip: false }
];

const SelectionRow = ({ label, field, options, formData, handleChange }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
    <span className="text-sm font-medium text-gray-700">{label} :</span>
    <RadioGroup
      value={formData[field]}
      onValueChange={(value) => handleChange(field, value)}
      className="flex gap-4"
    >
      {options.map(opt => (
        <div key={opt.value} className="flex items-center gap-2">
          <RadioGroupItem value={opt.value} id={`${field}-${opt.value}`} />
          <Label htmlFor={`${field}-${opt.value}`} className="text-xs cursor-pointer">{opt.label}</Label>
        </div>
      ))}
    </RadioGroup>
  </div>
);

const CreateOrder = () => {
  const [isOpenTeethDialog, setIsOpenTeethDialog] = useState(false);
  const [activeMaterialIndex, setActiveMaterialIndex] = useState(null);
  const [isOpenShadeDialog, setIsOpenShadeDialog] = useState(false);
  const [materialsShades, setMaterialsShades] = useState([]);
  const [shadeForm, setShadeForm] = useState({
    shade1: '',
    shade2: '',
    shade3: '',
    shadeA: '',
    shadeB: '',
    shadeC: '',
    selectedStains: [false, false, false, false, false, false],
    staining: '',
  });
  const [isOpenOptionalDialog, setIsOpenOptionalDialog] = useState(false);
  const [materialsOptionals, setMaterialsOptionals] = useState([]);
  const [optionalForm, setOptionalForm] = useState({
    pontic: null,
    metal: null,
  });
  const [formData, setFormData] = useState({
    fileNumber: '',
    orderDate: '2026-04-17',
    expectedDate: '2026-04-17',
    patientName: '',
    priority: false,
    design: 'Crown',
    selectedTeeth: [],
    connectorType: 'Individual',
    ponticDesign: 'modified-ridge-lap',
    // Materials
    materials: [{ material: '', design: '', notation: '', unit: '', shade: '', optionalDesign: '' }],
    // Digital Scans
    digitalScans: '',
    modelPrinted: '',
    modelRequired: '',
    iosSentVia: '',
    // Manual Impression
    upperImpression: '',
    lowerImpression: '',
    biteRequired: '',
    preOpCast: '',
    // Habits
    isGrinder: '',
    isSports: '',
    notes: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.fileNumber || !formData.patientName) {
      toast.error('Please fill in required fields: File Number and Patient Name');
      return;
    }

    // Submit logic here
    console.log('Submitting order:', formData);
    toast.success('Order submitted successfully!');
  };

  const toggleTooth = (id) => {
    setFormData(prev => ({
      ...prev,
      selectedTeeth: prev.selectedTeeth.includes(id)
        ? prev.selectedTeeth.filter(t => t !== id)
        : [...prev.selectedTeeth, id]
    }));
  };

  const toggleToothForMaterial = (id) => {
    if (activeMaterialIndex === null) return;

    setFormData(prev => {
      const currentNotationStr = prev.materials[activeMaterialIndex]?.notation || '';
      let selectedTeeth = currentNotationStr
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
        .map(Number);

      if (selectedTeeth.includes(id)) {
        selectedTeeth = selectedTeeth.filter(t => t !== id);
      } else {
        selectedTeeth = [...selectedTeeth, id];
      }

      selectedTeeth.sort((a, b) => a - b);
      const updatedNotation = selectedTeeth.join(', ');

      const updatedMaterials = prev.materials.map((m, i) => 
        i === activeMaterialIndex ? { ...m, notation: updatedNotation } : m
      );

      return {
        ...prev,
        materials: updatedMaterials
      };
    });
  };

  const openShadePopup = (index) => {
    setActiveMaterialIndex(index);
    const existingShadeData = materialsShades[index] || {
      shade1: '',
      shade2: '',
      shade3: '',
      shadeA: '',
      shadeB: '',
      shadeC: '',
      selectedStains: [false, false, false, false, false, false],
      staining: '',
    };
    setShadeForm(existingShadeData);
    setIsOpenShadeDialog(true);
  };

  const submitShadePopup = () => {
    if (activeMaterialIndex === null) return;

    // Save structured details in mapping
    setMaterialsShades(prev => {
      const updated = [...prev];
      updated[activeMaterialIndex] = shadeForm;
      return updated;
    });

    // Generate summary string
    const parts = [];
    const shadeTop = [shadeForm.shade1, shadeForm.shade2, shadeForm.shade3].filter(Boolean);
    if (shadeTop.length > 0) {
      parts.push(`1-3: ${shadeForm.shade1 || "-"}/${shadeForm.shade2 || "-"}/${shadeForm.shade3 || "-"}`);
    }
    const shadeLetters = [shadeForm.shadeA, shadeForm.shadeB, shadeForm.shadeC].filter(Boolean);
    if (shadeLetters.length > 0) {
      parts.push(`A-C: ${shadeForm.shadeA || "-"}/${shadeForm.shadeB || "-"}/${shadeForm.shadeC || "-"}`);
    }
    const charIdx = shadeForm.selectedStains.findIndex(v => v);
    if (charIdx !== -1) {
      parts.push(`Char: #${charIdx + 1}`);
    }
    if (shadeForm.staining) {
      parts.push(`Stain: ${shadeForm.staining.toUpperCase()}`);
    }

    const summaryStr = parts.join(" | ") || "Shade Added";

    // Update parent form's material shade string field
    setFormData(prev => {
      const updatedMaterials = prev.materials.map((m, i) => 
        i === activeMaterialIndex ? { ...m, shade: summaryStr } : m
      );
      return {
        ...prev,
        materials: updatedMaterials
      };
    });

    setIsOpenShadeDialog(false);
  };

  const openOptionalPopup = (index) => {
    setActiveMaterialIndex(index);
    const existingOptionalData = materialsOptionals[index] || {
      pontic: null,
      metal: null,
    };
    setOptionalForm(existingOptionalData);
    setIsOpenOptionalDialog(true);
  };

  const submitOptionalPopup = () => {
    if (activeMaterialIndex === null) return;

    // Save structured details in mapping
    setMaterialsOptionals(prev => {
      const updated = [...prev];
      updated[activeMaterialIndex] = optionalForm;
      return updated;
    });

    // Generate summary string
    const parts = [];
    if (optionalForm.pontic !== null) {
      parts.push(`Pontic: #${optionalForm.pontic}`);
    }
    if (optionalForm.metal !== null) {
      parts.push(`Metal: #${optionalForm.metal}`);
    }

    const summaryStr = parts.join(" | ") || "";

    // Update parent form's material optionalDesign string field
    setFormData(prev => {
      const updatedMaterials = prev.materials.map((m, i) => 
        i === activeMaterialIndex ? { ...m, optionalDesign: summaryStr } : m
      );
      return {
        ...prev,
        materials: updatedMaterials
      };
    });

    setIsOpenOptionalDialog(false);
  };

  const addMaterial = () => {
    setFormData(prev => ({
      ...prev,
      materials: [...prev.materials, { material: '', design: '', notation: '', unit: '', shade: '', optionalDesign: '' }]
    }));
  };

  const removeMaterial = (index) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index)
    }));
  };

  const updateMaterial = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.map((material, i) =>
        i === index ? { ...material, [field]: value } : material
      )
    }));
  };

  const toothQuadrants = [
    { label: "Upper Right I", ids: [18, 17, 16, 15, 14, 13, 12, 11] },
    { label: "Upper Left II", ids: [21, 22, 23, 24, 25, 26, 27, 28] },
    { label: "Lower Right IV", ids: [48, 47, 46, 45, 44, 43, 42, 41] },
    { label: "Lower Left III", ids: [31, 32, 33, 34, 35, 36, 37, 38] }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-slate-50 min-h-screen">
      <Toaster position="top-right" />
      
      <div className="flex justify-center border-b pb-4 bg-white p-4 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-medium tracking-tight mb-2 text-main">Create New Order</h1>
      </div>

      <div className="space-y-12">
        {/* SECTION 1: ORDER BASICS */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
            <div className="p-2 bg-main/10 text-main rounded-md">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">1. Order Basics</h2>
              <p className="text-xs text-gray-500">Core order details, materials, and teeth notation selection</p>
            </div>
          </div>

          <section className="bg-white border shadow-sm">
            <div className="grid grid-cols-5 bg-main text-white p-2 text-xs font-bold text-center">
              <div>FILE NUMBER</div><div>ORDER DATE</div><div>EXPECTED DATE</div><div>PATIENT NAME</div><div>PRIORITY</div>
            </div>
            <div className="grid grid-cols-5 gap-4 p-4 items-center">
              <Input
                className="rounded-none h-9"
                placeholder="Enter #"
                value={formData.fileNumber}
                onChange={(e) => handleChange('fileNumber', e.target.value)}
              />
              <Input
                type="date"
                value={formData.orderDate}
                onChange={(e) => handleChange('orderDate', e.target.value)}
                className="rounded-none h-9"
              />
              <Input
                type="date"
                value={formData.expectedDate}
                onChange={(e) => handleChange('expectedDate', e.target.value)}
                className="rounded-none h-9"
              />
              <Input
                className="rounded-none h-9"
                placeholder="Full Name"
                value={formData.patientName}
                onChange={(e) => handleChange('patientName', e.target.value)}
              />
              <div className="flex justify-center">
                <Checkbox
                  className="h-5 w-5"
                  checked={formData.priority}
                  onCheckedChange={(checked) => handleChange('priority', checked)}
                />
              </div>
            </div>
          </section>

          <section className="bg-white border shadow-sm overflow-hidden">
            <div className="grid grid-cols-7 bg-main text-white p-2 text-xs font-bold text-center">
              <div>MATERIALS</div><div>DESIGN</div><div>NOTATION</div><div>UNIT</div><div>SHADE</div><div>OPTIONAL DESIGN</div>
              <div className="flex justify-end pr-2">
                <Plus className="w-5 h-5 bg-green-500 rounded cursor-pointer hover:bg-green-600 transition-colors" onClick={addMaterial} />
              </div>
            </div>
            {formData.materials.map((material, index) => (
              <div key={index} className="grid grid-cols-7 gap-2 p-2 bg-gray-50 items-center">
                <Input
                  className="bg-white rounded-none h-9 border-none"
                  value={material.material}
                  onChange={(e) => updateMaterial(index, 'material', e.target.value)}
                />
                <Input
                  className="bg-white rounded-none h-9 border-none"
                  value={material.design}
                  onChange={(e) => updateMaterial(index, 'design', e.target.value)}
                />
                <Input
                  className="bg-white rounded-none h-9 border-none cursor-pointer placeholder:text-gray-400 text-xs font-semibold text-center hover:bg-slate-100/50 transition-colors"
                  placeholder="Select Teeth 🦷"
                  readOnly
                  value={material.notation}
                  onClick={() => {
                    setActiveMaterialIndex(index);
                    setIsOpenTeethDialog(true);
                  }}
                />
                <Input
                  className="bg-white rounded-none h-9 border-none"
                  value={material.unit}
                  onChange={(e) => updateMaterial(index, 'unit', e.target.value)}
                />
                <Input
                  className="bg-white rounded-none h-9 border-none cursor-pointer placeholder:text-gray-400 text-xs font-semibold text-center hover:bg-slate-100/50 transition-colors truncate"
                  placeholder="Select Shade 🎨"
                  readOnly
                  value={material.shade}
                  onClick={() => openShadePopup(index)}
                />
                <Input
                  className="bg-white rounded-none h-9 border-none cursor-pointer placeholder:text-gray-400 text-xs font-semibold text-center hover:bg-slate-100/50 transition-colors truncate"
                  placeholder="Select Design ⚙️"
                  readOnly
                  value={material.optionalDesign}
                  onClick={() => openOptionalPopup(index)}
                />
                <div className="flex justify-end pr-2">
                  <Minus
                    className="w-5 h-5 bg-red-500 text-white rounded cursor-pointer"
                    onClick={() => removeMaterial(index)}
                  />
                </div>
              </div>
            ))}
          </section>

          {/* Symmetrical Teeth Selection Table has been moved into the popup that opens when clicking the NOTATION field */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: "Types Of Trial", options: ['Jig Trial', 'Mock Trial', 'Metal Trial', 'Bisque Trial'] },
              { title: "If InSufficient Room", options: ['Trim Opposing', 'Call to Discuss', 'Metal Occlusal'] },
              { title: "Occlusal Contact", options: ['Light', 'Infra', 'Proper'] },
              { title: "Interproximal Contact", options: ['Point', 'Broad', 'Remove'] }
            ].map((block) => (
              <div key={block.title} className="border bg-white shadow-sm overflow-hidden">
                <div className="p-2 text-center border-b font-bold bg-slate-50 text-[10px] uppercase">{block.title}</div>
                <div className="p-3 space-y-2">
                  {block.options.map(option => (
                    <div key={option} className="flex items-center justify-between"><span className="text-xs">{option}</span><Checkbox className="h-4 w-4" /></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: GENERAL INFORMATION */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
            <div className="p-2 bg-main/10 text-main rounded-md">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">2. General Information</h2>
              <p className="text-xs text-gray-500">Digital scans and manual impression specifications</p>
            </div>
          </div>

          <div className="bg-white p-8 border shadow-sm min-h-[400px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Digital Scans Box */}
              <div className="border-2 border-black p-6 relative">
                <h3 className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 font-bold text-xs">Digital Scans Information</h3>
                <div className="space-y-4 mt-2">
                  <SelectionRow
                    label="Digital Scans"
                    field="digitalScans"
                    options={[{label:'Yes', value:'yes'}, {label:'No', value:'no'}]}
                    formData={formData}
                    handleChange={handleChange}
                  />
                  <SelectionRow
                    label="Model to be Printed"
                    field="modelPrinted"
                    options={[{label:'Yes', value:'yes'}, {label:'No', value:'no'}]}
                    formData={formData}
                    handleChange={handleChange}
                  />
                  <SelectionRow
                    label="3D Model Required"
                    field="modelRequired"
                    options={[{label:'Full Arch', value:'full'}, {label:'Half Arch', value:'half'}]}
                    formData={formData}
                    handleChange={handleChange}
                  />
                  <div className="flex items-center gap-4 py-2">
                    <span className="text-sm font-medium">Digital IOS Sent Via :</span>
                    <Input
                      className="flex-1 h-8 rounded-none border-gray-300"
                      value={formData.iosSentVia}
                      onChange={(e) => handleChange('iosSentVia', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Manual Impression Box */}
              <div className="border-2 border-black p-6 relative">
                <h3 className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 font-bold text-xs text-nowrap">Manual Impression Information Sending From Clinic</h3>
                <div className="space-y-4 mt-2">
                  <SelectionRow
                    label="Upper"
                    field="upperImpression"
                    options={[{label:'Impression', value:'imp'}, {label:'Cast', value:'cast'}]}
                    formData={formData}
                    handleChange={handleChange}
                  />
                  <SelectionRow
                    label="Lower"
                    field="lowerImpression"
                    options={[{label:'Impression', value:'imp'}, {label:'Cast', value:'cast'}]}
                    formData={formData}
                    handleChange={handleChange}
                  />
                  <SelectionRow
                    label="Bite"
                    field="biteRequired"
                    options={[{label:'Yes', value:'yes'}, {label:'No', value:'no'}]}
                    formData={formData}
                    handleChange={handleChange}
                  />
                  <SelectionRow
                    label="Pre Op cast"
                    field="preOpCast"
                    options={[{label:'Yes', value:'yes'}, {label:'No', value:'no'}]}
                    formData={formData}
                    handleChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: HABITS & UPLOADS */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
            <div className="p-2 bg-main/10 text-main rounded-md">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">3. Uploads & Habits</h2>
              <p className="text-xs text-gray-500">Patient habits, clinical notes, and file attachments</p>
            </div>
          </div>

          <div className="bg-white p-10 border shadow-sm space-y-8 text-center">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-20">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Is Patient Night Grinder :</span>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.isGrinder === 'yes'}
                    onCheckedChange={(checked) => handleChange('isGrinder', checked ? 'yes' : '')}
                  />
                  <span className="text-xs">Yes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.isGrinder === 'no'}
                    onCheckedChange={(checked) => handleChange('isGrinder', checked ? 'no' : '')}
                  />
                  <span className="text-xs">No</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Does Patient Play Contact Sports :</span>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.isSports === 'yes'}
                    onCheckedChange={(checked) => handleChange('isSports', checked ? 'yes' : '')}
                  />
                  <span className="text-xs">Yes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.isSports === 'no'}
                    onCheckedChange={(checked) => handleChange('isSports', checked ? 'no' : '')}
                  />
                  <span className="text-xs">No</span>
                </div>
              </div>
            </div>

            <div className="text-left space-y-2 max-w-4xl mx-auto">
              <Label className="font-bold text-xs uppercase text-gray-500">Notes :</Label>
              <Textarea
                className="min-h-[100px] border-gray-200"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
              />
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              <Label className="font-bold text-xs uppercase text-gray-500">Attachments :</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:bg-slate-50 transition-colors cursor-pointer">
                <p className="text-xl font-medium text-gray-600">Drop or Click here to add Attachment</p>
              </div>
              <div className="text-[10px] text-gray-400 space-y-1 text-left max-w-md mx-auto">
                <p>File Supports : JPEG, PNG, GIF, BMP</p>
                <p>Note : Allows Total File Size less than 10MB,</p>
                <p>Only 6 Files are Allowed to Upload</p>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-6 border-t border-gray-100">
              <Button
                className="bg-main hover:bg-mainhvr px-10 rounded-none h-10 font-bold"
                onClick={handleSubmit}
              >
                Submit Order
              </Button>
              <Button
                variant="outline"
                className="px-10 rounded-none h-10 border-gray-300 font-bold"
                onClick={() => toast.success('Print functionality not implemented yet')}
              >
                Print Form
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Symmetrical Teeth Selection Modal Popup */}
      <Dialog open={isOpenTeethDialog} onOpenChange={setIsOpenTeethDialog}>
        <DialogContent className="max-w-4xl sm:max-w-[850px] p-6 bg-slate-50 border-none rounded-lg shadow-2xl">
          <DialogHeader className="border-b pb-3 mb-4">
            <DialogTitle className="text-xl font-semibold text-main flex items-center gap-2">
              🦷 Select Teeth Notation
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Click on the teeth illustrations below to toggle their selection for the current material (Row #{activeMaterialIndex !== null ? activeMaterialIndex + 1 : ""}).
            </DialogDescription>
          </DialogHeader>

          {/* Interactive Teeth Selection Grid */}
          <div className="bg-white p-6 border border-gray-200/60 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 rounded-lg">
            {toothQuadrants.map((quad) => (
              <div key={quad.label} className="space-y-4">
                <div className="flex justify-center">
                  <span className="bg-main text-white px-4 py-1.5 text-xs font-semibold rounded-sm uppercase tracking-wider">
                    {quad.label}
                  </span>
                </div>
                <div className="flex justify-between px-2 gap-1.5">
                  {quad.ids.map(id => {
                    const toothData = toothArray.find(t => t.id === id);
                    const selectedTeethList = activeMaterialIndex !== null 
                      ? (formData.materials[activeMaterialIndex]?.notation?.split(',').map(s => s.trim()).filter(Boolean).map(Number) || [])
                      : [];
                    const isSelected = selectedTeethList.includes(id);

                    return (
                      <div 
                        key={id} 
                        onClick={() => toggleToothForMaterial(id)} 
                        className="flex flex-col items-center cursor-pointer transition-all hover:scale-105"
                      >
                        <img 
                          src={toothData ? toothData.image : "/teeths/11.png"} 
                          alt={`Tooth ${id}`} 
                          className={cn(
                            "w-9 h-13 border mb-1 object-contain p-1 rounded transition-all",
                            isSelected ? 'bg-main border-main text-white shadow-md' : 'border-gray-200 bg-white hover:border-main/50',
                            toothData?.flip && "scale-x-[-1]"
                          )} 
                        />
                        <span className={cn("text-[9px] font-bold mt-0.5", isSelected ? "text-main" : "text-gray-500")}>
                          {id}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Modal Footer with Confirmation Button */}
          <div className="flex justify-end gap-3 mt-4 pt-3 border-t">
            <Button 
              variant="outline" 
              className="rounded-none font-bold"
              onClick={() => setIsOpenTeethDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-main hover:bg-mainhvr rounded-none font-bold text-white px-6"
              onClick={() => setIsOpenTeethDialog(false)}
            >
              Confirm Selection ({activeMaterialIndex !== null ? (formData.materials[activeMaterialIndex]?.notation?.split(',').filter(Boolean).length || 0) : 0})
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Shade Details Modal Popup */}
      <Dialog open={isOpenShadeDialog} onOpenChange={setIsOpenShadeDialog}>
        <DialogContent className="max-w-4xl sm:max-w-[850px] p-6 bg-slate-50 border border-gray-200/80 rounded-lg shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-none">
          <DialogHeader className="border-b pb-3 mb-4">
            <DialogTitle className="text-xl font-bold text-gray-800">
              Shade Details & Characterization
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground font-medium">
              Configure anatomical shade regions, staining level, and visual characterization details.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Box 1: Shade Details */}
            <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm p-5 space-y-4">
              <h3 className="text-sm font-bold text-main border-b pb-2 flex items-center gap-2">
                🎨 Shade Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Incisor */}
                <div className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-lg border border-gray-100">
                  <div className="w-24 h-24 flex-shrink-0 bg-white p-1.5 border border-gray-200 rounded-lg flex items-center justify-center shadow-inner">
                    <img src="/shadedetails/fr1.png" alt="Incisor Shade Zones" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-1 space-y-2">
                    {[
                      { num: "1", label: "1.", field: "shade1" },
                      { num: "2", label: "2.", field: "shade2" },
                      { num: "3", label: "3.", field: "shade3" }
                    ].map(item => (
                      <div key={item.num} className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-700 w-4">{item.label}</span>
                        <Input
                          className="h-8 rounded-none focus:border-main text-xs font-semibold bg-white border-gray-200"
                          placeholder={`Enter Shade ${item.num}`}
                          value={shadeForm[item.field]}
                          onChange={(e) => setShadeForm(prev => ({ ...prev, [item.field]: e.target.value }))}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Molar */}
                <div className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-lg border border-gray-100">
                  <div className="w-24 h-24 flex-shrink-0 bg-white p-1.5 border border-gray-200 rounded-lg flex items-center justify-center shadow-inner">
                    <img src="/shadedetails/fr2.png" alt="Molar Shade Zones" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-1 space-y-2">
                    {[
                      { key: "A", label: "A.", field: "shadeA" },
                      { key: "B", label: "B.", field: "shadeB" },
                      { key: "C", label: "C.", field: "shadeC" }
                    ].map(item => (
                      <div key={item.key} className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-700 w-4">{item.label}</span>
                        <Input
                          className="h-8 rounded-none text-xs font-semibold bg-white border-gray-200"
                          placeholder={`Enter Shade ${item.key}`}
                          value={shadeForm[item.field]}
                          onChange={(e) => setShadeForm(prev => ({ ...prev, [item.field]: e.target.value }))}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Box 2: Characterization & Staining */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white rounded-xl border border-gray-200/60 shadow-sm p-5">
              {/* Left Side: Characterization */}
              <div className="md:col-span-8 space-y-4 border-r md:border-r border-gray-200/40 pr-0 md:pr-6 last:border-0">
                <h3 className="text-sm font-bold text-main flex items-center gap-2">
                  🦷 Characterization
                </h3>
                <div className="grid grid-cols-6 gap-2 pt-2">
                  {Array.from({ length: 6 }).map((_, i) => {
                    const idx = i + 1;
                    const isSelected = shadeForm.selectedStains[i];
                    return (
                      <div 
                        key={idx} 
                        onClick={() => setShadeForm(prev => {
                          const updated = [false, false, false, false, false, false];
                          updated[i] = !prev.selectedStains[i]; // Toggle Stain (single select style)
                          return { ...prev, selectedStains: updated };
                        })}
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                      >
                        <div className={cn(
                          "w-full aspect-square bg-slate-50/50 p-1 border rounded-lg flex items-center justify-center transition-all group-hover:scale-105 shadow-inner",
                          isSelected ? "border-main bg-main/5" : "border-gray-200 bg-white group-hover:border-main"
                        )}>
                          <img 
                            src={`/shadedetails/stain${idx}.png`} 
                            alt={`Stain outline ${idx}`} 
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <Checkbox 
                          checked={isSelected}
                          onCheckedChange={(checked) => setShadeForm(prev => {
                            const updated = [false, false, false, false, false, false];
                            updated[i] = !!checked;
                            return { ...prev, selectedStains: updated };
                          })}
                          className="h-4 w-4"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Side: Staining */}
              <div className="md:col-span-4 space-y-4 pl-0 md:pl-2">
                <h3 className="text-sm font-bold text-main flex items-center gap-2">
                  💧 Staining
                </h3>
                <div className="space-y-3 pt-2">
                  {["Light", "Medium", "Heavy"].map(level => {
                    const val = level.toLowerCase();
                    const isSelected = shadeForm.staining === val;
                    return (
                      <div 
                        key={level} 
                        onClick={() => setShadeForm(prev => ({
                          ...prev,
                          staining: prev.staining === val ? '' : val // Toggle Staining level
                        }))}
                        className="flex items-center justify-between cursor-pointer py-1.5 px-3 border border-gray-100 rounded-lg hover:bg-slate-50/50 transition-colors"
                      >
                        <span className="text-xs font-semibold text-gray-800">{level}</span>
                        <Checkbox 
                          checked={isSelected}
                          onCheckedChange={(checked) => setShadeForm(prev => ({
                            ...prev,
                            staining: checked ? val : ''
                          }))}
                          className="h-4 w-4"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-gray-200/40">
            <Button
              className="bg-main hover:bg-mainhvr text-white font-bold px-10 rounded-none h-10 min-w-[120px]"
              onClick={submitShadePopup}
            >
              Submit
            </Button>
            <Button
              variant="outline"
              className="bg-white hover:bg-slate-100 text-gray-800 font-bold px-10 rounded-none h-10 border border-gray-300 min-w-[120px]"
              onClick={() => setIsOpenShadeDialog(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Optional Design Modal Popup */}
      <Dialog open={isOpenOptionalDialog} onOpenChange={setIsOpenOptionalDialog}>
        <DialogContent className="max-w-4xl sm:max-w-[850px] p-6 bg-slate-50 border border-gray-200/80 rounded-lg shadow-2xl overflow-y-auto max-h-screen scrollbar-none">
          <DialogHeader className="border-b pb-3 mb-4">
            <DialogTitle className="text-xl font-bold text-gray-800">
              Optional Design Configuration
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground font-medium">
              Configure specialized Pontic and Metal structures for the selected material.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Box 1: Pontic Design */}
            <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm p-5 space-y-4 text-center">
              <h3 className="text-sm font-bold text-main border-b pb-2 flex items-center gap-2 text-left">
                🦷 Pontic Design
              </h3>
              <div className="grid grid-cols-5 gap-4 pt-2">
                {Array.from({ length: 5 }).map((_, i) => {
                  const idx = i + 1;
                  const isSelected = optionalForm.pontic === idx;
                  return (
                    <div 
                      key={idx} 
                      onClick={() => setOptionalForm(prev => ({
                        ...prev,
                        pontic: prev.pontic === idx ? null : idx
                      }))}
                      className="flex flex-col items-center gap-3 cursor-pointer group"
                    >
                      <div className={cn(
                        "w-full aspect-square bg-slate-50/50 p-2 border rounded-lg flex items-center justify-center transition-all group-hover:scale-105 shadow-inner",
                        isSelected ? "border-main bg-main/5" : "border-gray-200 bg-white group-hover:border-main"
                      )}>
                        <img 
                          src={`/optionaldesign/pontic${idx}.png`} 
                          alt={`Pontic design option ${idx}`} 
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <input 
                        type="radio"
                        checked={isSelected}
                        onChange={() => setOptionalForm(prev => ({ ...prev, pontic: idx }))}
                        className="h-4 w-4 cursor-pointer accent-main"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Box 2: Metal Design */}
            <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm p-5 space-y-4 text-center">
              <h3 className="text-sm font-bold text-main border-b pb-2 flex items-center gap-2 text-left">
                ⚙️ Metal Design
              </h3>
              <div className="grid grid-cols-5 gap-4 pt-2">
                {Array.from({ length: 5 }).map((_, i) => {
                  const idx = i + 1;
                  const isSelected = optionalForm.metal === idx;
                  return (
                    <div 
                      key={idx} 
                      onClick={() => setOptionalForm(prev => ({
                        ...prev,
                        metal: prev.metal === idx ? null : idx
                      }))}
                      className="flex flex-col items-center gap-3 cursor-pointer group"
                    >
                      <div className={cn(
                        "w-full aspect-square bg-slate-50/50 p-2 border rounded-lg flex items-center justify-center transition-all group-hover:scale-105 shadow-inner",
                        isSelected ? "border-main bg-main/5" : "border-gray-200 bg-white group-hover:border-main"
                      )}>
                        <img 
                          src={`/optionaldesign/metal${idx}.png`} 
                          alt={`Metal design option ${idx}`} 
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <input 
                        type="radio"
                        checked={isSelected}
                        onChange={() => setOptionalForm(prev => ({ ...prev, metal: idx }))}
                        className="h-4 w-4 cursor-pointer accent-main"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-gray-200/40">
            <Button
              className="bg-main hover:bg-mainhvr text-white font-bold px-10 rounded-none h-10 min-w-[120px]"
              onClick={submitOptionalPopup}
            >
              Submit
            </Button>
            <Button
              variant="outline"
              className="bg-white hover:bg-slate-100 text-gray-800 font-bold px-10 rounded-none h-10 border border-gray-300 min-w-[120px]"
              onClick={() => setIsOpenOptionalDialog(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateOrder;