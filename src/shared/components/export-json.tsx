'use client'

import { Button } from '@/components/ui/button'

interface ExportJsonProps {
    data: Record<string, number[]>
    reportName?: string
    period:string
}

export function ExportJson({
    data,
    reportName = 'Report se mora izeti iz ISPFIa',
period
}: ExportJsonProps) {
    const exportToJson = () => {
        if (!data || Object.keys(data).length === 0) {
            alert('No data to export.')
            return
        }

        // Build Form object with Header first, then add data keys
        const formObject: any = {
            Header: {
                Type: 25,
                Kind: 2
            }
        };
        
        // Add data keys after Header
        Object.keys(data).forEach(key => {
            formObject[key] = data[key];
        });

        const jsonStructure = {
            Header: {
                Name: reportName,
                OrganizationStatus: "None",
                OrganizationStatusChangedDate: null,
                Description: "",
                ReportTypePeriodId: period
            },
            Forms: [formObject]
        }

        const jsonString = JSON.stringify(jsonStructure, null, 2)
        const blob = new Blob([jsonString], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        
        const link = document.createElement('a')
        link.href = url
        link.download = reportName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    return (
        <Button variant="outline" className="p-1 bg-transparent" onClick={exportToJson}>
            Export to JSON - {reportName}
        </Button>
    )
}
