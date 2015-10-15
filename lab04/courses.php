<!DOCTYPE html>
<html>
<head>
    <title>Course list</title>
    <meta charset="utf-8" />
    <link href="courses.css" type="text/css" rel="stylesheet" />
</head>
<body>
<div id="header">
    <h1>Courses at CSE</h1>
<!-- Ex. 1: File of Courses -->
    <?php
        $lines = file("courses.tsv");
        $filename = basename("courses.tsv");
    ?>
    <p>
        Course list has <?= count($lines) ?> total courses
        and
        size of <?= filesize("courses.tsv") ?> bytes.
    </p>
</div>
<div class="article">
    <div class="section">
        <h2>Today's Courses</h2>
<!-- Ex. 2: Today’s Courses & Ex 6: Query Parameters -->
        <?php

            $numberOfCourses = 3;

           if(isset($_GET ["num_of_course"]) == 1 && $_GET ["num_of_course"] != ""){
                $numberOfCourses = (int) $_GET ["num_of_course"];
            }

            function getCoursesByNumber($listOfCourses, $numberOfCourses){
                $resultArray = array();
                $resultArray = array_rand($listOfCourses, $numberOfCourses);

                return $resultArray;
            }

            $todaysCourese = getCoursesByNumber($lines, $numberOfCourses);
        ?>

        <ol>
            <?php
                foreach ($todaysCourese as $todays) {
                    $tokencourse = explode("\t",$lines[$todays]);
                    $implodcourse = implode(" - ", $tokencourse);
                    ?>
                    <li><?= $implodcourse ?></li>
                    <?php }
            ?>
        </ol>
    </div>
    <div class="section">
        <h2>Searching Courses</h2>
<!-- Ex. 3: Searching Courses & Ex 6: Query Parameters -->
        <?php
            $startCharacter = "C";

            if(isset($_GET ["character"]) == 1 && $_GET ["character"] != ""){
                $startCharacter = $_GET ["character"];
            }

            function getCoursesByCharacter($listOfCourses, $startCharacter){
                
                $resultArray = array();

                foreach ($listOfCourses as $listcourse) {
                    if($listcourse[0] == $startCharacter){
                        array_push($resultArray, $listcourse);
                    }
                }

                return $resultArray;
            }

            $searchedCourses = getCoursesByCharacter($lines, $startCharacter);
        ?>
        <p>
            Courses that started by <strong>'<?= $startCharacter ?>'</strong> are followings :
        </p>
        <ol>
            <?php
                foreach ($searchedCourses as $searchcourse) {
                    $tokencourse2 = explode("\t",$searchcourse);
                    $implodcourse2 = implode(" - ", $tokencourse2);
                    ?>
                    <li><?= $implodcourse2 ?></li>
                    <?php }
            ?>
        </ol>
    </div>
    <div class="section">
        <h2>List of Courses</h2>
<!-- Ex. 4: List of Courses & Ex 6: Query Parameters -->
        <?php

            $orderby = 0;

            if(isset($_GET ["orderby"]) == 1 && $_GET ["orderby"] != ""){
                $orderby = (int) $_GET ["orderby"];
            }

            if($orderby == 0){
                $orderstat = "alphabetical order";
            }
            else{
                $orderstat = "alphabetical reverse order";
            }

            function getCoursesByOrder($listOfCourses, $orderby){
                $resultArray = $listOfCourses;

                if($orderby == 0){
                    sort($resultArray);
                }
                else if($orderby == 1){
                    rsort($resultArray);
                }

                return $resultArray;
            }

            $orderedCourses = getCoursesByOrder($lines, $orderby);
        ?>
        <p>
            All of courses ordered by <strong><?= $orderstat ?></strong> are followings :
        </p>
        <ol>
            <?php
                foreach ($orderedCourses as $ordercourse) {
                    $tokencourse3 = explode("\t",$ordercourse);
                    $implodcourse3 = implode(" - ", $tokencourse3);

                    if(strlen($tokencourse3[0]) > 20){ ?>
                        <li class = "long"><?= $implodcourse3 ?></li>
                        <?php }
                    else {?> <li><?= $implodcourse3 ?></li>
                    <?php }
                }
            ?>
        </ol>
    </div>
    <div class="section">
        <h2>Adding Courses</h2>
<!-- Ex. 5: Adding Courses & Ex 6: Query Parameters -->
        <?php
            if(isset($_GET ["new_course"]) == 1 && $_GET["new_course"] != "" && isset($_GET["code_of_course"]) == 1 && $_GET["code_of_course"] != ""){
                $newCourse = $_GET ["new_course"];
                $codeOfCourse = $_GET ["code_of_course"];
                $newarray[0] = $newCourse;
                $newarray[1] = $codeOfCourse;

                $newlist = implode("\t", $newarray);
                file_put_contents("courses.tsv", "\n", FILE_APPEND);
                file_put_contents("courses.tsv", $newlist, FILE_APPEND); ?>
                <p> Adding a course is success! </p>
                <?php
            }
            else{ ?>
                <p>Input course or code of the course doesn't exist.</p>
                <?php
            }
        ?>

    </div>
</div>
<div id="footer">
    <a href="http://validator.w3.org/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-html.png" alt="Valid HTML5" />
    </a>
    <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-css.png" alt="Valid CSS" />
    </a>
</div>
</body>
</html>