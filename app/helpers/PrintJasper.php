<?php


namespace App\helpers;


class PrintJasper
{

    protected $jasperProgramPath;
    protected $jaspersJsonFilePath;
    protected $jaspersReportFilePath;
    protected $outputPdfReportPath;
    protected $comand;
    protected $rootJson;

    protected $exec;

    public function __construct($rootJson=null, $outputPdfReportPath=null)
    {

        if($rootJson == null){
            $rootJson = 'report';
        }else{
            $this->rootJson = $rootJson;
        }

        if($outputPdfReportPath==null){
            $this->outputPdfReportPath = public_path('pdf');
        }else{
            $this->outputPdfReportPath = $outputPdfReportPath;
        }

        $this->jasperProgramPath        = resource_path('jasper') . DIRECTORY_SEPARATOR . 'jasperstarter' . DIRECTORY_SEPARATOR . 'bin';
        $this->jaspersJsonFilePath      = resource_path('jasper') . DIRECTORY_SEPARATOR . 'tmp' ;
        $this->jaspersReportFilePath    = resource_path('jasper') . DIRECTORY_SEPARATOR . 'reports' ;
        $this->exec                     = '.' . DIRECTORY_SEPARATOR . 'jasperstarter process ';
        $this->rootJson                 = $rootJson;

    }

    public function executeToPdf($jasperReport, $jsonDataFileSource, $outputFileName, $deleteJsonSourceFile = true){
        $jsonFileName = $this->getTempFile();

        $jasperReport = $this->jaspersReportFilePath . DIRECTORY_SEPARATOR . $jasperReport   . '.jrxml';
        $pdfFileName  = $this->outputPdfReportPath   . DIRECTORY_SEPARATOR . $outputFileName;

        file_put_contents($jsonFileName, $jsonDataFileSource, FILE_APPEND);

        $cd =     $this->exec . $jasperReport . " -o " . $pdfFileName . " -f pdf -t json --data-file " . $jsonFileName . ' --json-query "' . $this->rootJson . '"';
        $output = [];
        $returnVar = 0;

        chdir($this->jasperProgramPath);
        exec($cd, $output, $returnVar);

        if($deleteJsonSourceFile){
            unlink($jsonFileName);
        }

    }


    private function getTempFile(){
    	return $this->jaspersJsonFilePath . DIRECTORY_SEPARATOR . 'file_invoice_'.time().'.json';
    }
}
