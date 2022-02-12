 <?php

session_start();
 include 'header.php';
require_once('library.php');
$error = "";
if(isset($_POST['txtusername'])){
	$error = checkUser($_POST['txtusername'],$_POST['txtpassword'],$_POST['OfficeName']);
}//if

require_once('database.php');
 $server = "localhost";
  $user ="root";
  $pass ="";
  $dbname ="courier_db";
  //create connection 
  $conn =mysqli_connect($server, $user, $pass, $dbname);
  //check connection
  if(!$conn) {
     die ("connection failed : ". mysqli_connect_error());
  } else {
     echo "";
  }
$sql = "SELECT DISTINCT(off_name)
		FROM tbl_offices";
$result = dbQuery($sql);
if(isset ($_POST['Submit'])) {
    $name = $_POST['txtname'];
       $address= $_POST['txtadd'];
	      $email = $_POST['txtemailid'];
		     $contact = $_POST['txtnumber'];
			    $pass = $_POST['txtpassword'];
	         $office=$_POST['OfficeName'];
    

	$sql = "INSERT INTO tbl_courier_officers (officer_name,off_pwd,address,email,ph_no,office)
VALUES ('$name', '$pass', '$address','$email','$contact','$office')";

if (mysqli_query($conn, $sql)) {
    echo "Account Has Been Created";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
}



?>




<script language="javascript">
<!--
function memloginvalidate()
{
   if(document.form1.txtusername.value == "")
     {
        alert("Please enter admin UserName.");
        document.form1.txtusername.focus();
        return false;
     }
   if(document.form1.txtpassword.value == "")
     {
        alert("Please enter admin Password.");
        document.form1.txtpassword.focus();
        return false;
     }
   }

//-->
</script></head>


<body onLoad="document.form1.txtusername.focus();">


		



      
      <tr>
        <td><div align="center">
          <span class="redtext"><strong>          </strong></span><br>  
              <br>
        </div>

                                    <div class="register-photo">
                                        <div class="form-container">
                                            <font color="#FF0000" style="font-size:12px;">
                                                <?php echo $error; ?>
                                            </font>
                                            <div class="image-holder" style="/*margin-left: -1em;*/"></div>
                                            <form method="post">

                                                <h2 class="text-center"><strong>Create</strong> an account.</h2>
                                                <div class="form-group"><input name="txtadd" class="form-control" type="text"  placeholder="Name" required></div>
                                                <div class="form-group"><input name="txtnumber" class="form-control" type="tel"  placeholder="Phone"required></div>
                                                <div class="form-group"><input name="OfficeName" class="form-control" type="text"  placeholder="Country"required></div>
                                                <div class="form-group"><input  name="txtname"  class="form-control" type="email" placeholder="Email"required></div>
                                                <div class="form-group"><input name="txtemailid" class="form-control" type="email"  placeholder="Re-Enter Email"required>
                                                    <input class="form-control" type="password" name="txtpassword" placeholder="Password"required>
                                                    <input class="form-control" type="password" name="txtpassword" placeholder="Re-Enter Password"required>
                                                </div>

                                                <div class="form-group">
                                                    <div class="form-check"><label class="form-check-label"><input class="form-check-input" type="checkbox" required>I agree to the license terms.</label></div>
                                                    <div class="form-check"><label class="form-check-label"><input class="form-check-input" type="checkbox" >Remain anonymous(optional)</label></div>
                                                </div>
                                                <div class="form-group"><button class="btn btn-primary btn-block" name="Submit"  value="Submit" type="submit">Sign Up</button></div><a class="already" href="#">You already have an account? Login here.</a></form>
                                        </div>
                                    </div>

                      </tr>
                    </tbody></table></td>
                  </tr>

      


 <?php
 include 'footer.php';
			?>