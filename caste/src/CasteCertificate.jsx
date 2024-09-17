import React, { useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CertificateGenerator = () => {
  const [formData, setFormData] = useState({
    name: '',
    sonOrDaughter: '',
    villageTown: '',
    districtDivision: '',
    stateUnion: '',
    caste: '',
    resolutionNo: '',
    date: '',
    familyResidence: '',
    districtFamily: '',
    stateFamily: '',
  });

  const [imageBase64, setImageBase64] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle image file selection and convert it to base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result); // This will be the base64 string of the image
      };
      reader.readAsDataURL(file); // Convert image to base64
    }
  };

  const generatePDF = () => {
    const {
      name,
      sonOrDaughter,
      villageTown,
      districtDivision,
      stateUnion,
      caste,
      resolutionNo,
      date,
      familyResidence,
      districtFamily,
      stateFamily,
    } = formData;

    const docDefinition = {
      content: [
        {
          image: imageBase64, // Insert image if uploaded
          width: 100, // Adjust the width as needed
          alignment: 'center',
        },
        { text: '\n' }, // line break
        {
          text: 'FORM OF CERTIFICATE TO BE PRODUCED BY OTHER BACKWARD CLASSES APPLYING FOR APPOINTMENT TO POSTS UNDER THE GOVERNMENT OF INDIA',
          style: 'header',
          alignment: 'center',
        },
        { text: '\n' }, // line break
        {
          text: [
            { text: 'This is to certify that Shri/Smt./Kumari ' },
            { text: name, bold: true },
            { text: ` son/daughter of ${sonOrDaughter} of village/town ` },
            { text: villageTown, bold: true },
            { text: ' in District/Division ' },
            { text: districtDivision, bold: true },
            { text: ' in the State/Union Territory ' },
            { text: stateUnion, bold: true },
            { text: ' belongs to the ' },
            { text: caste, bold: true },
            { text: ' caste which is recognized as a backward class under the Government of India, Ministry of Social Justice and Empowerment’s Resolution No. ' },
            { text: resolutionNo, bold: true },
            { text: ' dated ' },
            { text: date, bold: true },
            { text: '.' },
          ],
          fontSize: 12,
        },
        { text: '\n' }, // line break
        {
          text: [
            { text: `Shri/Smt./Kumari ${name} and/or his/her family ordinarily resides in the ` },
            { text: familyResidence, bold: true },
            { text: ' District/Division of the ' },
            { text: districtFamily, bold: true },
            { text: ' State/Union Territory. This is also to certify that he/she does not belong to the persons/sections (Creamy Layer) mentioned in Column 3 of the Schedule to the Government of India, Department of Personnel & Training O.M. No. 36012/22/93 — Estt.(SCT) dated 8.9.1993.' },
          ],
          fontSize: 12,
        },
        { text: '\n\n\n' }, // more line breaks for spacing
        {
          text: '                   Deputy Commissioner etc.',
          alignment: 'right',
          fontSize: 12,
        },
        { text: '\n' }, // line break
        {
          text: 'Seal',
          alignment: 'left',
          fontSize: 12,
        },
        { text: '\n\n\n' }, // more space
        {
          text: [
            { text: '*', bold: true },
            { text: ' The authority issuing the certificate may have to mention the details of Resolution of Government of India, in which the caste of the candidate is mentioned as OBC.' },
          ],
          fontSize: 10,
        },
        {
          text: [
            { text: '**', bold: true },
            { text: ' As amended from time to time.' },
          ],
          fontSize: 10,
        },
        { text: '\n' }, // line break
        {
          text: 'Note: The term "Ordinarily" used here will have the same meaning as in Section 20 of the Representation of the People Act, 1950.',
          fontSize: 10,
        },
      ],
      styles: {
        header: {
          fontSize: 14,
          bold: true,
        },
      },
    };

    // Generate the PDF
    pdfMake.createPdf(docDefinition).download('certificate.pdf');
  };

  return (
    <div>
      <h2>Certificate Generator</h2>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Son/Daughter Of:</label>
          <input
            type="text"
            name="sonOrDaughter"
            value={formData.sonOrDaughter}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Village/Town:</label>
          <input
            type="text"
            name="villageTown"
            value={formData.villageTown}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>District/Division:</label>
          <input
            type="text"
            name="districtDivision"
            value={formData.districtDivision}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>State/Union Territory:</label>
          <input
            type="text"
            name="stateUnion"
            value={formData.stateUnion}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Caste:</label>
          <input
            type="text"
            name="caste"
            value={formData.caste}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Resolution No.:</label>
          <input
            type="text"
            name="resolutionNo"
            value={formData.resolutionNo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Family Residence:</label>
          <input
            type="text"
            name="familyResidence"
            value={formData.familyResidence}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>District/Division (Family):</label>
          <input
            type="text"
            name="districtFamily"
            value={formData.districtFamily}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>State/Union Territory (Family):</label>
          <input
            type="text"
            name="stateFamily"
            value={formData.stateFamily}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        <button type="button" onClick={generatePDF}>
          Generate Certificate
        </button>
      </form>
    </div>
  );
};

export default CertificateGenerator;
