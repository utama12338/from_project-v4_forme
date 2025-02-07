import Papa from 'papaparse';


type CSVData = Record<string, string | number | boolean>;

export const downloadCSV = (data: CSVData[], filename: string) => {
  const csv = Papa.unparse(data);
  const csvWithBOM = '\uFEFF' + csv;
  const blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
