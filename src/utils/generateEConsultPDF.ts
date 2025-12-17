// E-Consult PDF Generation Utility
// Generates a HIPAA-compliant, professional PDF from e-consult data

export interface EConsultPDFData {
  id: string;
  patientInitials: string;
  patientAge: number;
  patientDob?: string;
  patientGender?: string;
  conditionCategory: string;
  clinicalQuestion: string;
  additionalNotes?: string;
  heightCm?: number;
  weightKg?: number;
  bmi?: number;
  status: string;
  createdAt: string;
  referringClinicianName?: string;
  referringClinicianEmail?: string;
  referringClinicianPhone?: string;
  preferredResponseMethod?: string;
  labsAvailable?: string[];
  urgencyFlags?: string[];
  hasPriorEndoVisit?: string;
  lastEndoVisitDate?: string;
  weightPercentileCurrent?: string;
  heightPercentileCurrent?: string;
  growthVelocity?: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    obesity: "Obesity / Weight Management",
    growth: "Growth Problems / Short Stature",
    diabetes: "Diabetes / Blood Sugar",
    puberty: "Puberty Concerns",
    thyroid: "Thyroid Disorders",
    pcos: "PCOS",
    other: "Other Endocrine",
  };
  return labels[category] || category;
};

const formatStatus = (status: string): string => {
  return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const generateEConsultPDF = (data: EConsultPDFData): void => {
  // Create a new window for the PDF content
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    alert('Please allow popups to download the PDF');
    return;
  }

  const labLabels: Record<string, string> = {
    a1c: 'A1c',
    glucose: 'Glucose',
    tsh_t4: 'TSH / Free T4',
    lipids: 'Lipids',
    cmp_liver: 'CMP / Liver enzymes',
    vitamin_d: 'Vitamin D',
    bone_labs: 'Bone labs',
    morning_cortisol: 'Morning cortisol',
    none: 'No recent labs available',
  };

  const urgencyLabels: Record<string, string> = {
    high_blood_sugar: 'Very high blood sugar',
    diabetes_symptoms: 'Symptoms of diabetes (polyuria, polydipsia, weight loss)',
    severe_fatigue: 'Severe fatigue / vomiting',
    hypotension: 'Hypotension',
    rapid_pubertal_change: 'New rapid pubertal change',
    none: 'None',
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>E-Consult Summary - ${data.id.slice(0, 8).toUpperCase()}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #1a1a4e;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #1a1a4e;
        }
        .logo span {
          color: hsl(44, 100%, 45%);
        }
        .doc-info {
          text-align: right;
          font-size: 12px;
          color: #666;
        }
        .doc-info h2 {
          font-size: 16px;
          color: #1a1a4e;
          margin-bottom: 5px;
        }
        .section {
          margin-bottom: 25px;
        }
        .section-title {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a4e;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
          padding-bottom: 5px;
          border-bottom: 1px solid #e5e5e5;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .info-item {
          font-size: 13px;
        }
        .info-label {
          color: #666;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .info-value {
          font-weight: 500;
          color: #333;
        }
        .clinical-question {
          background-color: #f8f9fb;
          padding: 15px;
          border-radius: 8px;
          font-size: 13px;
        }
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }
        .status-submitted { background-color: #dbeafe; color: #1e40af; }
        .status-under_review { background-color: #fef3c7; color: #92400e; }
        .status-awaiting_info { background-color: #ffedd5; color: #c2410c; }
        .status-completed { background-color: #d1fae5; color: #065f46; }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e5e5;
          font-size: 10px;
          color: #999;
          text-align: center;
        }
        .confidential {
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
          padding: 10px;
          font-size: 11px;
          text-align: center;
          margin-bottom: 20px;
          border-radius: 4px;
        }
        .urgency-flags {
          background-color: #fef3c7;
          padding: 10px 15px;
          border-radius: 6px;
          margin-top: 10px;
        }
        .urgency-flags ul {
          margin-left: 20px;
          font-size: 12px;
        }
        @media print {
          body { padding: 20px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="confidential">
        ⚠️ CONFIDENTIAL MEDICAL INFORMATION - HIPAA PROTECTED
      </div>
      
      <div class="header">
        <div class="logo">Endo<span>MD</span> Health</div>
        <div class="doc-info">
          <h2>E-Consult Summary</h2>
          <p>ID: #${data.id.slice(0, 8).toUpperCase()}</p>
          <p>Generated: ${formatDate(new Date().toISOString())}</p>
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Patient Information</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Patient Initials</div>
            <div class="info-value">${data.patientInitials}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Age</div>
            <div class="info-value">${data.patientAge} years</div>
          </div>
          ${data.patientDob ? `
          <div class="info-item">
            <div class="info-label">Date of Birth</div>
            <div class="info-value">${formatDate(data.patientDob)}</div>
          </div>
          ` : ''}
          ${data.patientGender ? `
          <div class="info-item">
            <div class="info-label">Gender</div>
            <div class="info-value" style="text-transform: capitalize">${data.patientGender}</div>
          </div>
          ` : ''}
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Consultation Details</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Condition Category</div>
            <div class="info-value">${getCategoryLabel(data.conditionCategory)}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Status</div>
            <div class="info-value">
              <span class="status-badge status-${data.status}">${formatStatus(data.status)}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-label">Submitted</div>
            <div class="info-value">${formatDate(data.createdAt)}</div>
          </div>
        </div>
      </div>
      
      ${(data.heightCm || data.weightKg || data.bmi || data.growthVelocity) ? `
      <div class="section">
        <div class="section-title">Measurements</div>
        <div class="info-grid">
          ${data.heightCm ? `
          <div class="info-item">
            <div class="info-label">Height</div>
            <div class="info-value">${data.heightCm} cm</div>
          </div>
          ` : ''}
          ${data.weightKg ? `
          <div class="info-item">
            <div class="info-label">Weight</div>
            <div class="info-value">${data.weightKg} kg</div>
          </div>
          ` : ''}
          ${data.bmi ? `
          <div class="info-item">
            <div class="info-label">BMI</div>
            <div class="info-value">${data.bmi}</div>
          </div>
          ` : ''}
          ${data.growthVelocity ? `
          <div class="info-item">
            <div class="info-label">Growth Velocity</div>
            <div class="info-value">${data.growthVelocity} cm/year</div>
          </div>
          ` : ''}
          ${data.heightPercentileCurrent ? `
          <div class="info-item">
            <div class="info-label">Height Percentile</div>
            <div class="info-value">${data.heightPercentileCurrent}%</div>
          </div>
          ` : ''}
          ${data.weightPercentileCurrent ? `
          <div class="info-item">
            <div class="info-label">Weight Percentile</div>
            <div class="info-value">${data.weightPercentileCurrent}%</div>
          </div>
          ` : ''}
        </div>
      </div>
      ` : ''}
      
      <div class="section">
        <div class="section-title">Clinical Question</div>
        <div class="clinical-question">${data.clinicalQuestion}</div>
        ${data.additionalNotes ? `
        <div style="margin-top: 15px;">
          <div class="info-label">Additional Notes</div>
          <div class="clinical-question" style="margin-top: 5px;">${data.additionalNotes}</div>
        </div>
        ` : ''}
      </div>
      
      ${data.labsAvailable && data.labsAvailable.length > 0 ? `
      <div class="section">
        <div class="section-title">Recent Labs Available</div>
        <div style="font-size: 13px;">
          ${data.labsAvailable.map(lab => labLabels[lab] || lab).join(', ')}
        </div>
      </div>
      ` : ''}
      
      ${data.urgencyFlags && data.urgencyFlags.length > 0 && !data.urgencyFlags.includes('none') ? `
      <div class="section">
        <div class="section-title">Urgency Flags</div>
        <div class="urgency-flags">
          <ul>
            ${data.urgencyFlags.map(flag => `<li>${urgencyLabels[flag] || flag}</li>`).join('')}
          </ul>
        </div>
      </div>
      ` : ''}
      
      ${data.referringClinicianName ? `
      <div class="section">
        <div class="section-title">Referring Provider</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Clinician Name</div>
            <div class="info-value">${data.referringClinicianName}</div>
          </div>
          ${data.referringClinicianEmail ? `
          <div class="info-item">
            <div class="info-label">Email</div>
            <div class="info-value">${data.referringClinicianEmail}</div>
          </div>
          ` : ''}
          ${data.referringClinicianPhone ? `
          <div class="info-item">
            <div class="info-label">Phone</div>
            <div class="info-value">${data.referringClinicianPhone}</div>
          </div>
          ` : ''}
          ${data.preferredResponseMethod ? `
          <div class="info-item">
            <div class="info-label">Preferred Response</div>
            <div class="info-value" style="text-transform: capitalize">${data.preferredResponseMethod === 'portal' ? 'E-Consult Portal' : data.preferredResponseMethod}</div>
          </div>
          ` : ''}
        </div>
      </div>
      ` : ''}
      
      <div class="footer">
        <p>This document is confidential and intended solely for the use of the individual or entity to whom it is addressed.</p>
        <p style="margin-top: 5px;">EndoMD Health | Pediatric Endocrinology E-Consult Platform</p>
      </div>
      
      <div class="no-print" style="text-align: center; margin-top: 30px;">
        <button onclick="window.print()" style="background: #1a1a4e; color: white; padding: 12px 30px; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500;">
          Download as PDF
        </button>
        <p style="margin-top: 10px; font-size: 12px; color: #666;">Click the button above or use Ctrl/Cmd + P to save as PDF</p>
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
};
