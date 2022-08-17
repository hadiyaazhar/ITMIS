import React ,{ useRef }from 'react'

const Module = ({cols,users}) => {
  const dt = useRef(null);
  const exportColumns = cols.map((col) => ({
  title: col.header,
  dataKey: col.field,
}));

const exportCSV = (selectionOnly) => {
  dt.current.exportCSV({ selectionOnly });
};

const exportPdf = () => {
  import("jspdf").then((jsPDF) => {
    import("jspdf-autotable").then(() => {
      const doc = new jsPDF.default(0, 0);
      doc.autoTable(exportColumns, users);
      doc.save("complexData.pdf");
    });
  });
};

  return (
    <div>
      
    </div>
  )
}

export default Module
