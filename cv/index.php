<?php
$file = new \SplFileObject('cv-mickael-vieira.pdf');

header('Pragma: public');
header('Expires: 0');
header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
header('Last-Modified: '. gmdate('D, d M Y H:i:s', $file->getMTime()) . ' GMT');
header('Cache-Control: private', false);
header('Content-Type: application/pdf');
header('Content-Disposition: attachment; filename="' . $file->getBasename() . '"');
header('Content-Transfer-Encoding: binary');
header('Content-Length: ' . $file->getSize());
header('Connection: close');
readfile($file->getRealPath());
exit;