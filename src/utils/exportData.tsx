import { json2csv } from "json-2-csv";
import fileDownload from "js-file-download";

const exportData = async (data: any[], desc: string = "export") => {
  const dataCsv = await json2csv(data as any[]);

  fileDownload(dataCsv, `${desc}_${new Date().toISOString()}.csv`);
};

export default exportData;
