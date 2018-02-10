<?php
  if (isset($_POST['envoyer'])) {
      if (get_magic_quotes_gpc()) {
        $name	     	= stripslashes(trim($_POST['name']));
        $subject		= stripslashes(trim($_POST['subject']));
        $message		= stripslashes(trim($_POST['message']));
      } else {
        $name		    = trim($_POST['name']);
        $subject		= trim($_POST['subject']);
        $message		= trim($_POST['message']);
      }
      $regex_head = '/[\n\r]/';
      if (preg_match($regex_head, $name) || preg_match($regex_head, $subject)) {
          $alert = 'Headers are prohibited';
      } elseif (!isset($_COOKIE['sent'])) {
          $to = 'mathieu.roussilhe@gmail.com';
          $msg = 'A new mail has been sent from your portfolio :D'."\r\n\r\n";
          $msg .= 'From : '.$name."\r\n";
          $msg .= 'Subject : '.$subject."\r\n";
          $msg .= 'Message : '.$message."\r\n";
          $headers = 'From: '.$name."\r\n";
          if (mail($to, $subject, $msg, $headers)) {
              $alert = 'E-mail envoyé avec succès';
              setcookie("sent", "1", time() + 10);
              unset($_POST);
          } else {
              $alert = 'Erreur d\'envoi de l\'e-mail';
          }
      } else {
          unset($_POST);
      }
    header('Location: index.html#contact');
  }
?>