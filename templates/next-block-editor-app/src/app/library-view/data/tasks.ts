// Define unified task type
export interface TaskItemType {
  id: string;
  title: string;
  description: string;
  lastEdited?: string;
  version?: string;
  date?: string;
  starred?: boolean;
  imageUrl?: string;
  author?: string;
  variant?: 'default' | 'compact' | 'search';
  onClick?: () => void;
  run_count?: number;
  eval_rating?: number;
  cost: number;  // 1-5 integer representing cost level
  output_type?: 'file' | 'website' | 'integration' | 'input' | 'code' | 'message' | 'media';
  demo_output?: {
    type: 'file' | 'website' | 'integration' | 'input' | 'code' | 'message' | 'media';
    output: string;
    metadata?: {
      fileType?: string;
      thumbnail?: string;
      url?: string;
      platform?: string;
      summary?: string;
    };
  };
  form?: {
    fields: {
      label: string;
      type?: 'file' | 'select' | 'text' | 'textarea';  // Made optional since some fields are just text
      placeholder?: string;
      options?: string[];
      description?: string;
      required?: boolean;
      demo_value?: string; // Add demo value for form field
    }[];
  };
}

// More card data for different sections based on professional categories
export const searchTasks = {
  accounting: [
    {
      id: 'accounting1',
      title: 'Invoice Categorization',
      description: 'Automatically categorize invoices by vendor and expense type',
      author: 'FinanceFlow Solutions',
      date: '2025-05-08',
      starred: true,
      run_count: 189542,
      eval_rating: 4.8,
      cost: 3,
      demo_output: {
        type: 'file' as const,
        output: 'categorized-invoices-2024-q1.xlsx',
        metadata: {
          fileType: 'Excel Spreadsheet',
          summary: 'Categorized invoices with vendor analysis'
        }
      },
      form: {
        fields: [
          {
            label: 'To categorize your invoices by vendor and expense type, first upload your invoice data.',
            type: 'file' as const,
            description: 'CSV file containing invoice details',
            required: true,
            demo_value: 'invoices-2024-q1.csv'
          },
          {
            label: 'Next, automatically apply this category style to each row.',
            type: 'select' as const,
            options: [
              'Business function',
              'Department',
              'Project code',
              'Cost center',
              'Custom categories'
            ],
            required: true,
            demo_value: 'Department'
          },
          {
            label: 'Finally, generate a CSV file with the correct categories appended.',
            demo_value: 'categorized-invoices-2024-q1.csv'
          }
        ]
      }
    },
    {
      id: 'accounting2',
      title: 'Payment Reminder Generator',
      description: 'Generate customized payment reminder emails for outstanding invoices',
      author: 'Sarah Chen, CPA',
      date: '2025-05-06',
      starred: false,
      run_count: 156731,
      eval_rating: 4.6,
      cost: 2,
      demo_output: {
        type: 'message' as const,
        output: 'Dear valued partner,\n\nThis is a friendly reminder that invoice #INV-2024-0123 for $12,500 is currently outstanding. Payment was due on March 15, 2024.\n\nPlease note our new wire transfer details effective April 1st, 2024.\n\nBest regards,\nAccounts Receivable Team'
      },
      form: {
        fields: [
          {
            label: 'To generate payment reminders, first upload your accounts receivable data.',
            type: 'file' as const,
            description: 'CSV file containing invoice details and payment status',
            required: true,
            demo_value: 'accounts-receivable-march2024.csv'
          },
          {
            label: 'Select your preferred reminder tone.',
            type: 'select' as const,
            options: [
              'Professional and formal',
              'Friendly but firm',
              'Direct and urgent',
              'Gentle reminder'
            ],
            required: true,
            demo_value: 'Friendly but firm'
          },
          {
            label: 'Include any specific payment instructions or notes.',
            type: 'textarea' as const,
            placeholder: 'E.g., Updated banking details or payment methods',
            required: false,
            demo_value: 'Please note our new wire transfer details effective April 1st, 2024.'
          },
          {
            label: 'The system will generate personalized reminder emails for each overdue invoice.',
            demo_value: 'reminder-emails-batch-march2024.zip'
          }
        ]
      }
    },
    {
      id: 'accounting3',
      title: 'Expense Report Summarizer',
      description: 'Create concise summaries from detailed expense reports in PDF format',
      author: 'Wordware',
      date: '2025-05-05',
      starred: false,
      run_count: 103451,
      eval_rating: 4.3,
      cost: 2,
      demo_output: {
        type: 'file' as const,
        output: 'q1-2024-expense-summary.pdf',
        metadata: {
          fileType: 'PDF Report',
          summary: 'Expense summary with category breakdown'
        }
      },
      form: {
        fields: [
          {
            label: 'To create a concise summary of your expense reports, first upload your expense report PDF.',
            type: 'file' as const,
            description: 'Supports standard expense report formats',
            required: true,
            demo_value: 'q1-2024-expenses.pdf'
          },
          {
            label: 'Choose the summary format.',
            type: 'select' as const,
            options: [
              'By category',
              'By date',
              'By project',
              'By department'
            ],
            required: true,
            demo_value: 'By category'
          },
          {
            label: 'Set the minimum amount threshold for detailed breakdowns.',
            type: 'text' as const,
            placeholder: 'E.g., 100.00',
            description: 'Expenses above this amount will get detailed explanations',
            required: false,
            demo_value: '500.00'
          },
          {
            label: 'A concise summary report will be generated with key expense insights and patterns.',
            demo_value: 'q1-2024-expense-summary.pdf'
          }
        ]
      }
    },
    {
      id: 'accounting4',
      title: 'Transaction Anomaly Detector',
      description: 'Identify unusual patterns or anomalies in transaction logs',
      date: '2025-05-04',
      starred: false,
      run_count: 82134,
      eval_rating: 4.7,
      cost: 4,
      demo_output: {
        type: 'code' as const,
        output: `{
  "anomalies_detected": [
    {
      "transaction_id": "TX-2024-985",
      "amount": 15000,
      "risk_level": "high",
      "reason": "Amount 350% above category average",
      "recommendation": "Review vendor authorization"
    },
    {
      "transaction_id": "TX-2024-986",
      "amount": 2500,
      "risk_level": "medium",
      "reason": "Unusual time pattern detected",
      "recommendation": "Verify transaction timing"
    }
  ],
  "analysis_period": "Last 90 days",
  "total_transactions_reviewed": 1542
}`
      },
      form: {
        fields: [
          {
            label: 'To identify unusual patterns in your transactions, first upload your transaction log file.',
            type: 'file' as const,
            description: 'CSV or Excel file containing transaction data',
            required: true,
            demo_value: 'march2024-transactions.xlsx'
          },
          {
            label: 'Select the anomaly detection criteria.',
            type: 'select' as const,
            options: [
              'Amount thresholds',
              'Frequency patterns',
              'Time-based patterns',
              'Vendor/payee patterns',
              'All of the above'
            ],
            required: true,
            demo_value: 'All of the above'
          },
          {
            label: 'Define your sensitivity level for anomaly detection.',
            type: 'select' as const,
            options: [
              'High (flag subtle variations)',
              'Medium (balanced detection)',
              'Low (flag major anomalies only)'
            ],
            required: true,
            demo_value: 'Medium (balanced detection)'
          },
          {
            label: 'Set the date range for historical comparison.',
            type: 'select' as const,
            options: [
              'Last 30 days',
              'Last 90 days',
              'Last 180 days',
              'Last 365 days',
              'All available data'
            ],
            required: true,
            demo_value: 'Last 90 days'
          },
          {
            label: 'The system will analyze your transactions and generate a detailed report of identified anomalies with risk levels and recommendations.',
            demo_value: 'transaction-anomalies-march2024.pdf'
          }
        ]
      }
    },
    {
      id: 'accounting5',
      title: 'Tax Memo Simplifier',
      description: 'Rephrase complex tax memos for better client understanding',
      date: '2025-05-02',
      starred: false,
      run_count: 67842,
      eval_rating: 4.5,
      cost: 2,
      form: {
        fields: [
          {
            label: 'To simplify your tax memo for better understanding, first upload your tax memo document.',
            type: 'file' as const,
            description: 'PDF or Word document containing tax explanations',
            required: true,
            demo_value: 'complex-tax-memo-2024.pdf'
          },
          {
            label: 'Select your target audience.',
            type: 'select' as const,
            options: [
              'Small business owners',
              'Individual taxpayers',
              'Non-finance professionals',
              'Finance team members'
            ],
            required: true,
            demo_value: 'Small business owners'
          },
          {
            label: 'Choose the level of tax terminology to retain.',
            type: 'select' as const,
            options: [
              'Keep essential terms only',
              'Include common tax terms',
              'Maintain all technical terms with explanations'
            ],
            required: true,
            demo_value: 'Keep essential terms only'
          },
          {
            label: 'A simplified version of your tax memo will be generated, maintaining accuracy while improving readability.',
            demo_value: 'simplified-tax-memo-2024.pdf'
          }
        ]
      }
    },
    {
      id: 'accounting6',
      title: 'Financial Summary Translator',
      description: 'Convert technical financial summaries into plain English',
      date: '2025-05-01',
      starred: false,
      run_count: 93287,
      eval_rating: 4.9,
      cost: 3,
      form: {
        fields: [
          {
            label: 'To convert your technical financial summary into plain English, first upload your financial summary.',
            type: 'file' as const,
            description: 'PDF, Excel, or Word document containing financial data and analysis',
            required: true
          },
          {
            label: 'Select the type of financial content.',
            type: 'select' as const,
            options: [
              'Earnings report',
              'Financial statements',
              'Investment analysis',
              'Budget report',
              'Market analysis'
            ],
            required: true
          },
          {
            label: 'Choose your preferred visualization options.',
            type: 'select' as const,
            options: [
              'Text only',
              'Include basic charts',
              'Comprehensive visualizations',
              'Interactive elements'
            ],
            required: true
          },
          {
            label: 'Add any specific terms or metrics to emphasize.',
            type: 'textarea' as const,
            placeholder: 'E.g., ROI, market share, growth rate',
            required: false
          },
          {
            label: 'Your financial summary will be translated into clear, accessible language with appropriate visualizations.'
          }
        ]
      }
    }
  ],
  legal: [
    {
      id: 'legal1',
      title: 'Contract Summarizer',
      description: 'Extract key points from contracts and present them in bullet form',
      date: '2025-05-07',
      starred: true,
      run_count: 201643,
      eval_rating: 4.9,
      cost: 4,
      demo_output: {
        type: 'website' as const,
        output: 'https://contracts.example.com/summary/2024-03-15',
        metadata: {
          url: 'https://contracts.example.com/summary/2024-03-15',
          thumbnail: '/contract-summary-preview.png',
          summary: 'Interactive contract summary with key terms highlighted'
        }
      },
      form: {
        fields: [
          {
            label: 'To extract key points from your contract, first upload your contract document.',
            type: 'file' as const,
            description: 'PDF or Word document containing the contract',
            required: true,
            demo_value: 'service-agreement-2024.pdf'
          },
          {
            label: 'Select the contract type.',
            type: 'select' as const,
            options: [
              'Employment contract',
              'Service agreement',
              'Sales contract',
              'License agreement',
              'Partnership agreement',
              'Other (specify below)'
            ],
            required: true,
            demo_value: 'Service agreement'
          },
          {
            label: 'Specify focus areas for analysis.',
            type: 'select' as const,
            options: [
              'All key terms',
              'Obligations and duties',
              'Payment terms',
              'Termination clauses',
              'Liability and indemnification',
              'Custom selection'
            ],
            required: true,
            demo_value: 'All key terms'
          },
          {
            label: 'Additional terms or clauses to highlight.',
            type: 'textarea' as const,
            placeholder: 'Enter specific terms or clauses you want to emphasize',
            required: false,
            demo_value: 'Data protection requirements, Service level agreements'
          },
          {
            label: 'Choose summary format.',
            type: 'select' as const,
            options: [
              'Bullet points by section',
              'Executive summary',
              'Timeline of obligations',
              'Risk assessment format'
            ],
            required: true,
            demo_value: 'Executive summary'
          },
          {
            label: 'A comprehensive contract summary will be generated, highlighting key terms, obligations, and potential risks.',
            demo_value: 'contract-summary-report.pdf'
          }
        ]
      }
    },
    {
      id: 'legal2',
      title: 'Lease Clause Identifier',
      description: 'Flag important clauses and terms in lease agreements',
      date: '2025-05-05',
      starred: false,
      run_count: 145632,
      eval_rating: 4.7,
      cost: 3,
      form: {
        fields: [
          {
            label: 'To identify important clauses in your lease agreement, first upload your lease agreement.',
            type: 'file' as const,
            description: 'PDF or Word document containing the lease',
            required: true,
            demo_value: 'office-lease-2024.pdf'
          },
          {
            label: 'Select the type of lease.',
            type: 'select' as const,
            options: [
              'Commercial property',
              'Residential property',
              'Equipment lease',
              'Vehicle lease',
              'Other (specify below)'
            ],
            required: true,
            demo_value: 'Commercial property'
          },
          {
            label: 'Choose clause categories to analyze.',
            type: 'select' as const,
            options: [
              'All standard clauses',
              'Payment and fees',
              'Maintenance and repairs',
              'Term and renewal',
              'Default and remedies',
              'Custom selection'
            ],
            required: true,
            demo_value: 'All standard clauses'
          },
          {
            label: 'Specify any additional terms to flag.',
            type: 'textarea' as const,
            placeholder: 'Enter specific terms or conditions to highlight',
            required: false,
            demo_value: 'Property improvements, Sublease conditions, Early termination'
          },
          {
            label: 'The system will analyze your lease agreement and provide a detailed breakdown of important clauses with risk assessments.',
            demo_value: 'lease-analysis-report.pdf'
          }
        ]
      }
    },
    {
      id: 'legal3',
      title: 'Legal Text Simplifier',
      description: 'Rewrite legalese into client-friendly text',
      date: '2025-05-03',
      starred: false,
      run_count: 173492,
      eval_rating: 4.6,
      cost: 2,
      form: {
        fields: [
          {
            label: 'To simplify your legal document for better understanding, first upload your legal document.',
            type: 'file' as const,
            description: 'PDF or Word document containing legal text',
            required: true,
            demo_value: 'complex-legal-document-2024.pdf'
          },
          {
            label: 'Select target audience.',
            type: 'select' as const,
            options: [
              'General public',
              'Business clients',
              'Technical users',
              'Mixed audience'
            ],
            required: true,
            demo_value: 'General public'
          },
          {
            label: 'Choose simplification level.',
            type: 'select' as const,
            options: [
              'Maximum simplification',
              'Balanced approach',
              'Light simplification',
              'Technical terms explained'
            ],
            required: true,
            demo_value: 'Balanced approach'
          },
          {
            label: 'The system will generate a simplified version of your legal document that maintains accuracy while improving readability.',
            demo_value: 'simplified-legal-document-2024.pdf'
          }
        ]
      }
    },
    {
      id: 'legal4',
      title: 'NDA Term Analyzer',
      description: 'Identify missing standard terms in non-disclosure agreements',
      date: '2025-05-01',
      starred: false,
      run_count: 87234,
      eval_rating: 4.4,
      cost: 3,
      form: {
        fields: [
          {
            label: 'Upload your NDA document.',
            type: 'file' as const,
            description: 'PDF or Word document containing the NDA',
            required: true,
            demo_value: 'contractor-nda-draft.pdf'
          },
          {
            label: 'Select NDA type.',
            type: 'select' as const,
            options: [
              'One-way NDA',
              'Mutual NDA',
              'Employee NDA',
              'Contractor NDA'
            ],
            required: true,
            demo_value: 'Contractor NDA'
          },
          {
            label: 'Choose industry context.',
            type: 'select' as const,
            options: [
              'Technology',
              'Healthcare',
              'Financial services',
              'General business'
            ],
            required: true,
            demo_value: 'Technology'
          },
          {
            label: 'The system will analyze your NDA and identify any missing standard terms or potential issues.',
            demo_value: 'nda-analysis-report.pdf'
          }
        ]
      }
    },
    {
      id: 'legal5',
      title: 'MSA Obligation Extractor',
      description: 'Extract key obligations from master service agreements',
      date: '2025-04-29',
      starred: false,
      run_count: 74325,
      eval_rating: 4.2,
      cost: 3,
      form: {
        fields: [
          {
            label: 'Upload your MSA document.',
            type: 'file' as const,
            description: 'PDF or Word document containing the MSA',
            required: true,
            demo_value: 'enterprise-msa-2024.pdf'
          },
          {
            label: 'Select obligation types to extract.',
            type: 'select' as const,
            options: [
              'All obligations',
              'Service provider obligations',
              'Client obligations',
              'Mutual obligations'
            ],
            required: true,
            demo_value: 'All obligations'
          },
          {
            label: 'Choose output format.',
            type: 'select' as const,
            options: [
              'Timeline view',
              'Categorized list',
              'Responsibility matrix',
              'Summary report'
            ],
            required: true,
            demo_value: 'Responsibility matrix'
          },
          {
            label: 'The system will extract and organize all key obligations from your MSA.',
            demo_value: 'msa-obligations-matrix.xlsx'
          }
        ]
      }
    },
    {
      id: 'legal6',
      title: 'ToS Risk Identifier',
      description: 'Identify potentially risky language in Terms of Service documents',
      date: '2025-04-27',
      starred: false,
      run_count: 63421,
      eval_rating: 4.5,
      cost: 4,
      form: {
        fields: [
          {
            label: 'Upload your Terms of Service document.',
            type: 'file' as const,
            description: 'PDF or Word document containing the Terms of Service',
            required: true,
            demo_value: 'platform-tos-2024.docx'
          },
          {
            label: 'Select risk assessment areas.',
            type: 'select' as const,
            options: [
              'All risk areas',
              'Liability clauses',
              'User rights',
              'Data handling',
              'Dispute resolution'
            ],
            required: true,
            demo_value: 'All risk areas'
          },
          {
            label: 'Choose jurisdiction.',
            type: 'select' as const,
            options: [
              'United States',
              'European Union',
              'United Kingdom',
              'International'
            ],
            required: true,
            demo_value: 'United States'
          },
          {
            label: 'The system will analyze your Terms of Service and identify potentially risky language or missing protections.',
            demo_value: 'tos-risk-assessment.pdf'
          }
        ]
      }
    }
  ],
  hr: [
    {
      id: 'hr1',
      title: 'Job Description Reviser',
      description: 'Rewrite job descriptions to be more inclusive and appealing',
      date: '2025-05-08',
      starred: true,
      run_count: 187392,
      eval_rating: 4.8,
      cost: 2,
      demo_output: {
        type: 'integration' as const,
        output: 'Updated job description in Workday\nSynced changes to LinkedIn job post\nGenerated SEO-optimized version for website',
        metadata: {
          platform: 'Workday, LinkedIn'
        }
      },
      form: {
        fields: [
          {
            label: 'To make your job description more inclusive and appealing, first upload your job description document.',
            type: 'file' as const,
            description: 'PDF or Word document containing the job description',
            required: true,
            demo_value: 'senior-developer-job-desc.docx'
          },
          {
            label: 'Select your target inclusivity improvements.',
            type: 'select' as const,
            options: [
              'Gender-neutral language',
              'Accessibility terms',
              'Cultural inclusivity',
              'Age-neutral phrasing',
              'All of the above'
            ],
            required: true,
            demo_value: 'All of the above'
          },
          {
            label: 'Choose the tone for the revised description.',
            type: 'select' as const,
            options: [
              'Welcoming and casual',
              'Professional and approachable',
              'Dynamic and energetic',
              'Balanced and neutral'
            ],
            required: true,
            demo_value: 'Professional and approachable'
          },
          {
            label: 'The system will revise your job description to be more inclusive while maintaining your key requirements and qualifications.',
            demo_value: 'revised-senior-developer-job-desc.docx'
          }
        ]
      }
    },
    {
      id: 'hr2',
      title: 'Interview Notes Summarizer',
      description: 'Create structured scorecards from interview notes',
      date: '2025-05-05',
      starred: false,
      run_count: 143752,
      eval_rating: 4.5,
      cost: 2,
      form: {
        fields: [
          {
            label: 'To create a structured scorecard from your interview notes, first upload your interview notes.',
            type: 'file' as const,
            description: 'Text, PDF, or Word document containing interview notes',
            required: true,
            demo_value: 'candidate-interview-notes-march15.docx'
          },
          {
            label: 'Select the interview evaluation criteria.',
            type: 'select' as const,
            options: [
              'Technical skills',
              'Soft skills',
              'Cultural fit',
              'Experience validation',
              'All standard criteria'
            ],
            required: true,
            demo_value: 'All standard criteria'
          },
          {
            label: 'Choose the scorecard format.',
            type: 'select' as const,
            options: [
              'Numeric ratings (1-5)',
              'Qualitative assessment',
              'Hybrid (ratings + comments)',
              'Strengths/Weaknesses format'
            ],
            required: true,
            demo_value: 'Hybrid (ratings + comments)'
          },
          {
            label: 'The system will generate a structured scorecard with ratings and key observations from your interview notes.',
            demo_value: 'candidate-evaluation-march15.pdf'
          }
        ]
      }
    },
    {
      id: 'hr3',
      title: 'Performance Review Generator',
      description: 'Generate objective performance review language based on metrics',
      date: '2025-05-02',
      starred: false,
      run_count: 98543,
      eval_rating: 4.3,
      cost: 3,
      form: {
        fields: [
          {
            label: 'To generate an objective performance review, first upload your employee performance data.',
            type: 'file' as const,
            description: 'CSV or Excel file containing performance metrics',
            required: true
          },
          {
            label: 'Select performance metrics to analyze.',
            type: 'select' as const,
            options: [
              'KPI achievement',
              'Project completion rates',
              'Peer feedback',
              'Skill development',
              'All available metrics'
            ],
            required: true
          },
          {
            label: 'Choose review period.',
            type: 'select' as const,
            options: [
              'Quarterly review',
              'Semi-annual review',
              'Annual review',
              'Custom period'
            ],
            required: true
          },
          {
            label: 'Select review tone.',
            type: 'select' as const,
            options: [
              'Constructive and encouraging',
              'Direct and objective',
              'Growth-focused',
              'Achievement-oriented'
            ],
            required: true
          },
          {
            label: 'The system will generate a balanced performance review with specific examples and actionable feedback based on the provided metrics.'
          }
        ]
      }
    },
    {
      id: 'hr4',
      title: 'Employee Feedback Classifier',
      description: 'Organize employee feedback into relevant themes for action',
      date: '2025-04-30',
      starred: false,
      run_count: 75632,
      eval_rating: 4.2,
      cost: 3,
      form: {
        fields: [
          {
            label: 'To organize employee feedback into actionable themes, first upload your employee feedback data.',
            type: 'file' as const,
            description: 'CSV, Excel, or text file containing feedback responses',
            required: true
          },
          {
            label: 'Select classification categories.',
            type: 'select' as const,
            options: [
              'Work environment',
              'Management effectiveness',
              'Career development',
              'Company culture',
              'Custom categories'
            ],
            required: true
          },
          {
            label: 'Choose sentiment analysis depth.',
            type: 'select' as const,
            options: [
              'Basic (positive/negative)',
              'Detailed (multiple sentiments)',
              'Advanced (with context)',
              'Comprehensive analysis'
            ],
            required: true
          },
          {
            label: 'Add custom keywords to track.',
            type: 'textarea' as const,
            placeholder: 'Enter specific terms or phrases to monitor',
            required: false
          },
          {
            label: 'The system will analyze and categorize feedback, identifying key themes and sentiment patterns with actionable insights.'
          }
        ]
      }
    },
    {
      id: 'hr5',
      title: 'HR Policy Formatter',
      description: 'Convert HR policies into FAQ format for easier reference',
      date: '2025-04-28',
      starred: false,
      run_count: 53245,
      eval_rating: 4.1,
      cost: 1,
      form: {
        fields: [
          {
            label: 'To convert your HR policies into an easy-to-navigate FAQ format, first upload your HR policy document.',
            type: 'file' as const,
            description: 'PDF or Word document containing HR policies',
            required: true
          },
          {
            label: 'Select the policy sections to convert.',
            type: 'select' as const,
            options: [
              'All policies',
              'Benefits and leave',
              'Workplace conduct',
              'Employment terms',
              'Custom selection'
            ],
            required: true
          },
          {
            label: 'Choose FAQ organization style.',
            type: 'select' as const,
            options: [
              'By topic',
              'By department',
              'By frequency of use',
              'By policy importance'
            ],
            required: true
          },
          {
            label: 'The system will convert your HR policies into an easy-to-navigate FAQ format while maintaining policy accuracy.'
          }
        ]
      }
    },
    {
      id: 'hr6',
      title: 'Onboarding Checklist Creator',
      description: 'Generate comprehensive onboarding checklists from wiki content',
      date: '2025-04-26',
      starred: false,
      run_count: 124563,
      eval_rating: 4.7,
      cost: 2,
      form: {
        fields: [
          {
            label: 'To create a comprehensive onboarding checklist, first upload your wiki content or onboarding documentation.',
            type: 'file' as const,
            description: 'Text, PDF, or Word documents containing onboarding information',
            required: true
          },
          {
            label: 'Select employee type for checklist.',
            type: 'select' as const,
            options: [
              'New hire (general)',
              'Remote employee',
              'Department-specific',
              'Contract worker',
              'Internal transfer'
            ],
            required: true
          },
          {
            label: 'Choose checklist timeframe.',
            type: 'select' as const,
            options: [
              'First day',
              'First week',
              'First month',
              '90-day plan',
              'Custom timeline'
            ],
            required: true
          },
          {
            label: 'Add custom onboarding items.',
            type: 'textarea' as const,
            placeholder: 'Enter any additional tasks or requirements',
            required: false
          },
          {
            label: 'The system will generate a structured onboarding checklist with time-based tasks and resources from your documentation.'
          }
        ]
      }
    }
  ],
  marketing: [
    {
      id: 'marketing1',
      title: 'SEO Blog Outline Generator',
      description: 'Create detailed blog outlines based on target keywords',
      date: '2025-05-09',
      starred: true,
      run_count: 195432,
      eval_rating: 4.9,
      cost: 2,
      demo_output: {
        type: 'input' as const,
        output: 'The outline suggests covering "Implementation Challenges" section. Would you like to include common pitfalls from recent case studies?',
        metadata: {
          summary: 'User input needed for outline customization'
        }
      },
      form: {
        fields: [
          {
            label: 'To create an SEO-optimized blog outline, first enter your target keywords.',
            type: 'textarea' as const,
            placeholder: 'One keyword or phrase per line',
            description: 'Primary and secondary keywords for your blog post',
            required: true,
            demo_value: 'artificial intelligence in business\nmachine learning applications\nAI implementation strategy'
          },
          {
            label: 'Select content type.',
            type: 'select' as const,
            options: [
              'How-to guide',
              'List article',
              'In-depth analysis',
              'Product comparison',
              'Industry trends'
            ],
            required: true,
            demo_value: 'In-depth analysis'
          },
          {
            label: 'Choose content length.',
            type: 'select' as const,
            options: [
              'Short (800-1000 words)',
              'Medium (1500-2000 words)',
              'Long (2500-3000 words)',
              'Comprehensive (3500+ words)'
            ],
            required: true,
            demo_value: 'Long (2500-3000 words)'
          },
          {
            label: 'The system will generate an SEO-optimized outline with section headings, key points, and suggested word counts.',
            demo_value: 'ai-business-implementation-outline.docx'
          }
        ]
      }
    },
    {
      id: 'marketing2',
      title: 'Technical Copy Simplifier',
      description: 'Rephrase technical product information for social media audiences',
      date: '2025-05-06',
      starred: false,
      run_count: 167432,
      eval_rating: 4.7,
      cost: 2,
      form: {
        fields: [
          {
            label: 'To simplify your technical content for social media, first upload your technical content.',
            type: 'file' as const,
            description: 'PDF, Word, or text file containing technical product information',
            required: true,
            demo_value: 'product-specs-v2.docx'
          },
          {
            label: 'Select target platform.',
            type: 'select' as const,
            options: [
              'LinkedIn',
              'Twitter/X',
              'Instagram',
              'Facebook',
              'All platforms'
            ],
            required: true,
            demo_value: 'LinkedIn'
          },
          {
            label: 'Choose audience technical level.',
            type: 'select' as const,
            options: [
              'Complete beginner',
              'Some technical knowledge',
              'Industry familiar',
              'Mixed audience'
            ],
            required: true,
            demo_value: 'Mixed audience'
          },
          {
            label: 'The system will simplify your technical content into engaging social media posts while maintaining accuracy.',
            demo_value: 'social-media-content-pack.zip'
          }
        ]
      }
    },
    {
      id: 'marketing3',
      title: 'Webinar Transcript Optimizer',
      description: 'Turn webinar transcripts into engaging blog post ideas',
      date: '2025-05-03',
      starred: false,
      run_count: 86543,
      eval_rating: 4.3,
      cost: 3,
      form: {
        fields: [
          {
            label: 'Upload your webinar transcript.',
            type: 'file' as const,
            description: 'Text or Word document containing the webinar transcript',
            required: true,
            demo_value: 'ai-trends-webinar-transcript.docx'
          },
          {
            label: 'Select content format preferences.',
            type: 'select' as const,
            options: [
              'Single comprehensive post',
              'Series of shorter posts',
              'Key takeaways format',
              'Q&A style format',
              'Mixed content types'
            ],
            required: true,
            demo_value: 'Series of shorter posts'
          },
          {
            label: 'Choose content focus areas.',
            type: 'select' as const,
            options: [
              'Technical details',
              'Practical applications',
              'Case studies',
              'Expert insights',
              'Audience questions'
            ],
            required: true,
            demo_value: 'Practical applications'
          },
          {
            label: 'Add custom sections to include.',
            type: 'textarea' as const,
            placeholder: 'Enter specific topics or segments to highlight',
            required: false,
            demo_value: 'Industry trends 2024, Implementation strategies, Success metrics'
          },
          {
            label: 'The system will transform your webinar transcript into structured blog content with proper formatting and engagement elements.',
            demo_value: 'ai-trends-blog-series.zip'
          }
        ]
      }
    },
    {
      id: 'marketing4',
      title: 'Customer Review Summarizer',
      description: 'Extract themes and patterns from customer reviews',
      date: '2025-04-30',
      starred: false,
      run_count: 132456,
      eval_rating: 4.6,
      cost: 3,
      form: {
        fields: [
          {
            label: 'Upload your customer reviews.',
            type: 'file' as const,
            description: 'CSV or Excel file containing customer reviews',
            required: true
          },
          {
            label: 'Select analysis categories.',
            type: 'select' as const,
            options: [
              'Product features',
              'Customer service',
              'User experience',
              'Price value',
              'All categories'
            ],
            required: true
          },
          {
            label: 'Choose sentiment grouping method.',
            type: 'select' as const,
            options: [
              'By rating',
              'By topic',
              'By date range',
              'By product/service',
              'Custom grouping'
            ],
            required: true
          },
          {
            label: 'Set minimum review count for pattern identification.',
            type: 'text' as const,
            placeholder: 'E.g., 10',
            description: 'Minimum number of reviews needed to identify a pattern',
            required: true
          },
          {
            label: 'The system will analyze your customer reviews and generate a comprehensive report with key themes, trends, and actionable insights.'
          }
        ]
      }
    },
    {
      id: 'marketing5',
      title: 'Brand Voice Guide Creator',
      description: 'Translate brand guidelines into practical writing examples',
      date: '2025-04-27',
      starred: false,
      run_count: 65432,
      eval_rating: 4.4,
      cost: 4,
      form: {
        fields: [
          {
            label: 'To create a practical brand voice guide, first upload your brand guidelines.',
            type: 'file' as const,
            description: 'PDF or Word document containing brand guidelines',
            required: true,
            demo_value: 'brand-guidelines-2024.pdf'
          },
          {
            label: 'Select content types for examples.',
            type: 'select' as const,
            options: [
              'Social media posts',
              'Email communications',
              'Website content',
              'Marketing materials',
              'All content types'
            ],
            required: true,
            demo_value: 'All content types'
          },
          {
            label: 'Choose brand voice attributes.',
            type: 'select' as const,
            options: [
              'Professional & authoritative',
              'Friendly & approachable',
              'Bold & innovative',
              'Elegant & sophisticated',
              'Custom combination'
            ],
            required: true,
            demo_value: 'Professional & authoritative'
          },
          {
            label: 'Select industry-specific considerations.',
            type: 'select' as const,
            options: [
              'B2B technology',
              'Consumer products',
              'Professional services',
              'E-commerce',
              'Custom industry'
            ],
            required: true,
            demo_value: 'B2B technology'
          },
          {
            label: 'Add specific terms or phrases to include.',
            type: 'textarea' as const,
            placeholder: 'Enter brand-specific terminology or key phrases',
            required: false,
            demo_value: 'Innovation, Excellence, Customer-centric, Enterprise-grade'
          },
          {
            label: 'The system will create a practical brand voice guide with real-world examples and writing templates for different contexts.',
            demo_value: 'brand-voice-guide-2024.pdf'
          }
        ]
      }
    },
    {
      id: 'marketing6',
      title: 'Tweet Thread Generator',
      description: 'Convert blog posts into engaging Twitter/X thread formats',
      date: '2025-04-24',
      starred: false,
      run_count: 154321,
      eval_rating: 4.8,
      cost: 1,
      form: {
        fields: [
          {
            label: 'Upload your blog post.',
            type: 'file' as const,
            description: 'Text, PDF, or Word document containing the blog post',
            required: true
          },
          {
            label: 'Choose thread style.',
            type: 'select' as const,
            options: [
              'Key points summary',
              'Step-by-step guide',
              'Story format',
              'Tips and tricks'
            ],
            required: true
          },
          {
            label: 'Select thread length.',
            type: 'select' as const,
            options: [
              'Short (5-7 tweets)',
              'Medium (8-12 tweets)',
              'Long (13-20 tweets)',
              'Custom length'
            ],
            required: true
          },
          {
            label: 'The system will convert your blog post into an engaging tweet thread while maintaining key information and readability.'
          }
        ]
      }
    }
  ],
  product: [
    {
      id: 'product1',
      title: 'Feature Release Notes Generator',
      description: 'Create clear release notes from technical feature documentation',
      date: '2025-05-10',
      starred: true,
      run_count: 172438,
      eval_rating: 4.7,
      cost: 2,
      demo_output: {
        type: 'media' as const,
        output: '/release-notes-preview.png',
        metadata: {
          summary: 'Visual changelog with feature highlights and user impact'
        }
      },
      form: {
        fields: [
          {
            label: 'To create clear release notes from your feature documentation, first upload your technical documentation.',
            type: 'file' as const,
            description: 'PDF, Word, or Markdown files containing feature documentation',
            required: true,
            demo_value: 'feature-docs-v2.1.md'
          },
          {
            label: 'Select release note format.',
            type: 'select' as const,
            options: [
              'User-focused summary',
              'Developer changelog',
              'Mixed audience format',
              'Marketing highlights'
            ],
            required: true,
            demo_value: 'Mixed audience format'
          },
          {
            label: 'Choose categorization method.',
            type: 'select' as const,
            options: [
              'By feature type',
              'By impact level',
              'By user role',
              'By product area'
            ],
            required: true,
            demo_value: 'By impact level'
          },
          {
            label: 'The system will generate clear and organized release notes highlighting key changes and improvements.',
            demo_value: 'release-notes-v2.1.md'
          }
        ]
      }
    },
    {
      id: 'product2',
      title: 'UX Copy from Wireframes',
      description: 'Generate user-friendly interface copy from wireframe mockups',
      date: '2025-05-07',
      starred: false,
      run_count: 93245,
      eval_rating: 4.5,
      cost: 3,
      form: {
        fields: [
          {
            label: 'To generate user-friendly interface copy, first upload your wireframe files.',
            type: 'file' as const,
            description: 'PDF, PNG, or design tool export files',
            required: true,
            demo_value: 'dashboard-wireframes-v3.fig'
          },
          {
            label: 'Select interface elements to focus on.',
            type: 'select' as const,
            options: [
              'Buttons and CTAs',
              'Form labels and hints',
              'Error messages',
              'Navigation items',
              'All UI elements'
            ],
            required: true,
            demo_value: 'All UI elements'
          },
          {
            label: 'Choose tone of voice.',
            type: 'select' as const,
            options: [
              'Clear and direct',
              'Friendly and helpful',
              'Professional and formal',
              'Casual and conversational'
            ],
            required: true,
            demo_value: 'Friendly and helpful'
          },
          {
            label: 'Add brand-specific terms.',
            type: 'textarea' as const,
            placeholder: 'Enter product or feature names to use',
            required: false,
            demo_value: 'DataFlow Pro, SmartSync, QuickView Dashboard'
          },
          {
            label: 'The system will generate user-friendly copy for all selected interface elements following your brand voice.',
            demo_value: 'ux-copy-suggestions.csv'
          }
        ]
      }
    },
    {
      id: 'product3',
      title: 'Error Message Humanizer',
      description: 'Rewrite technical error messages with empathy and clarity',
      date: '2025-05-04',
      starred: false,
      run_count: 158732,
      eval_rating: 4.9,
      cost: 2,
      form: {
        fields: [
          {
            label: 'To rewrite technical error messages with empathy and clarity, first upload your error message log.',
            type: 'file' as const,
            description: 'CSV, JSON, or text file containing error messages',
            required: true,
            demo_value: 'system-errors-march2024.json'
          },
          {
            label: 'Select error message style.',
            type: 'select' as const,
            options: [
              'Friendly and helpful',
              'Clear and direct',
              'Technical but accessible',
              'Casual and reassuring'
            ],
            required: true,
            demo_value: 'Friendly and helpful'
          },
          {
            label: 'Choose solution detail level.',
            type: 'select' as const,
            options: [
              'Basic guidance',
              'Step-by-step help',
              'Technical details included',
              'Mixed (based on error type)'
            ],
            required: true,
            demo_value: 'Mixed (based on error type)'
          },
          {
            label: 'The system will transform technical error messages into user-friendly communications with clear next steps.',
            demo_value: 'user-friendly-error-messages.csv'
          }
        ]
      }
    },
    {
      id: 'product4',
      title: 'User Research Summarizer',
      description: 'Extract key insights from user research interview transcripts',
      date: '2025-05-01',
      starred: false,
      run_count: 87652,
      eval_rating: 4.4,
      cost: 4,
      form: {
        fields: [
          {
            label: 'To extract key insights from your user research, first upload your research transcripts.',
            type: 'file' as const,
            description: 'Text or Word documents containing interview transcripts',
            required: true,
            demo_value: 'user-interviews-batch3.zip'
          },
          {
            label: 'Select research focus areas.',
            type: 'select' as const,
            options: [
              'User pain points',
              'Feature requests',
              'Usage patterns',
              'User satisfaction',
              'All insights'
            ],
            required: true,
            demo_value: 'All insights'
          },
          {
            label: 'Choose analysis method.',
            type: 'select' as const,
            options: [
              'Thematic analysis',
              'Journey mapping',
              'Feature prioritization',
              'Sentiment analysis',
              'Comprehensive review'
            ],
            required: true,
            demo_value: 'Thematic analysis'
          },
          {
            label: 'Set participant grouping criteria.',
            type: 'select' as const,
            options: [
              'By user role',
              'By experience level',
              'By use case',
              'By feature usage',
              'Custom segments'
            ],
            required: true,
            demo_value: 'By user role'
          },
          {
            label: 'Add specific terms to track.',
            type: 'textarea' as const,
            placeholder: 'Enter keywords or phrases to monitor',
            required: false,
            demo_value: 'onboarding experience, dashboard usage, export functionality'
          },
          {
            label: 'The system will analyze interview transcripts and generate a detailed insights report with actionable recommendations.',
            demo_value: 'user-research-insights-q1.pdf'
          }
        ]
      }
    },
    {
      id: 'product5',
      title: 'Feedback Theme Analyzer',
      description: 'Prioritize user feedback based on frequency and impact',
      date: '2025-04-28',
      starred: false,
      run_count: 72563,
      eval_rating: 4.3,
      cost: 3,
      form: {
        fields: [
          {
            label: 'To prioritize user feedback based on frequency and impact, first upload your user feedback data.',
            type: 'file' as const,
            description: 'CSV or Excel file containing user feedback',
            required: true
          },
          {
            label: 'Select feedback sources to analyze.',
            type: 'select' as const,
            options: [
              'Support tickets',
              'Survey responses',
              'App reviews',
              'Social media',
              'All sources'
            ],
            required: true
          },
          {
            label: 'Choose prioritization criteria.',
            type: 'select' as const,
            options: [
              'Frequency of mention',
              'User impact level',
              'Implementation effort',
              'Business value',
              'Balanced scoring'
            ],
            required: true
          },
          {
            label: 'Set feedback time range.',
            type: 'select' as const,
            options: [
              'Last 30 days',
              'Last quarter',
              'Last 6 months',
              'Last year',
              'All time'
            ],
            required: true
          },
          {
            label: 'The system will analyze feedback patterns and generate a prioritized list of themes with supporting data.'
          }
        ]
      }
    },
    {
      id: 'product6',
      title: 'Product Requirements Summarizer',
      description: 'Create concise summaries of detailed product requirements',
      date: '2025-04-25',
      starred: false,
      run_count: 103452,
      eval_rating: 4.6,
      cost: 3,
      form: {
        fields: [
          {
            label: 'To create a concise summary of your product requirements, first upload your product requirements document.',
            type: 'file' as const,
            description: 'PDF or Word document containing detailed requirements',
            required: true
          },
          {
            label: 'Select summary format.',
            type: 'select' as const,
            options: [
              'Executive brief',
              'Technical overview',
              'User story format',
              'Feature checklist',
              'Mixed format'
            ],
            required: true
          },
          {
            label: 'Choose detail level.',
            type: 'select' as const,
            options: [
              'High-level only',
              'Key features focus',
              'Technical details included',
              'Comprehensive but concise'
            ],
            required: true
          },
          {
            label: 'Add specific requirements to highlight.',
            type: 'textarea' as const,
            placeholder: 'Enter key requirements or features to emphasize',
            required: false
          },
          {
            label: 'The system will generate a clear and structured summary of your product requirements document.'
          }
        ]
      }
    }
  ]
}

// Custom tasks for My Tasks section
export const customTasks: TaskItemType[] = [
  {
    id: 'task1',
    title: 'Invoice Categorization by Vendor',
    description: 'Automatically sort and tag invoices based on vendor information',
    lastEdited: '2 days ago',
    version: 'v1.3',
    run_count: 5432,
    eval_rating: 4.2,
    cost: 3
  },
  {
    id: 'task2',
    title: 'Legal Contract Summarizer',
    description: 'Extract key points and obligations from complex legal contracts',
    lastEdited: '5 hours ago',
    version: 'v2.1',
    run_count: 3215,
    eval_rating: 4.5,
    cost: 4
  },
  {
    id: 'task3',
    title: 'Job Description Inclusivity Checker',
    description: 'Analyze job postings for inclusive language and suggest improvements',
    lastEdited: 'Yesterday',
    version: 'v1.0',
    run_count: 1754,
    eval_rating: 3.9,
    cost: 2
  }
]

// Section definitions for browse page
export interface SectionDefinition {
  id: string;
  title: string;
  emoji: string;
  viewAllLink: string;
  viewCount?: number;
  cardsSource: 'accounting' | 'legal' | 'hr' | 'marketing' | 'product';
  linkDestination?: string;  // URL or route where "View All" should navigate to
  relatedTasks?: string[];   // IDs of related tasks for this section
}

export const pageSections: SectionDefinition[] = [
  {
    id: 'accounting',
    title: 'Accounting & Finance',
    emoji: '💼',
    viewAllLink: 'Show 187 Finance Tasks',
    viewCount: 187,
    cardsSource: 'accounting',
    linkDestination: '/tasks/accounting',
    relatedTasks: ['accounting1', 'accounting3', 'accounting5']
  },
  {
    id: 'legal',
    title: 'Legal & Compliance',
    emoji: '⚖️',
    viewAllLink: 'Show 248 Legal Tasks',
    viewCount: 248,
    cardsSource: 'legal',
    linkDestination: '/tasks/legal',
    relatedTasks: ['legal1', 'legal2', 'legal4']
  },
  {
    id: 'hr',
    title: 'Human Resources',
    emoji: '👥',
    viewAllLink: 'Show 173 HR Tasks',
    viewCount: 173,
    cardsSource: 'hr',
    linkDestination: '/tasks/hr',
    relatedTasks: ['hr1', 'hr3', 'hr6']
  },
  {
    id: 'marketing',
    title: 'Marketing',
    emoji: '📣',
    viewAllLink: 'Show 92 Marketing Tasks',
    viewCount: 92,
    cardsSource: 'marketing',
    linkDestination: '/tasks/marketing',
    relatedTasks: ['marketing1', 'marketing5']
  },
  {
    id: 'product',
    title: 'Product & Design',
    emoji: '🎨',
    viewAllLink: 'Show 205 Product Tasks',
    viewCount: 205,
    cardsSource: 'product',
    linkDestination: '/tasks/product',
    relatedTasks: ['product1', 'product3', 'product5']
  }
]

// Helper function to get all starred tasks across all categories
export const getFavoriteItems = (): TaskItemType[] => {
  const allStarredItems: TaskItemType[] = [];
  
  // Get starred items from searchTasks
  for (const category in searchTasks) {
    const starredInCategory = searchTasks[category as keyof typeof searchTasks].filter(task => task.starred);
    allStarredItems.push(...starredInCategory);
  }
  
  return allStarredItems;
}

// Utility function to get a task by ID from any category
export const getTaskById = (id: string): TaskItemType | undefined => {
  // Check in all search task collections
  for (const category in searchTasks) {
    const found = searchTasks[category as keyof typeof searchTasks].find(card => card.id === id);
    if (found) return found;
  }
  
  const customTask = customTasks.find(task => task.id === id);
  if (customTask) return customTask;
  
  return undefined;
} 