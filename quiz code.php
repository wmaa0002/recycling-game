<?php


/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       http://ays-pro.com/
 * @since      1.0.0
 *
 * @package    Quiz_Maker
 * @subpackage Quiz_Maker/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Quiz_Maker
 * @subpackage Quiz_Maker/includes
 * @author     AYS Pro LLC <info@ays-pro.com>
 */
class Quiz_Theme_Rect_Light extends Quiz_Maker_Public{

    private $plugin_name;

    private $version;

    private $theme_name;



    public function __construct($plugin_name,$plugin_version,$theme_name) {
        $this->version = $plugin_version;
        $this->plugin_name = $plugin_name;
        $this->theme_name = $theme_name;
        $this->define_theme_styles();
        $this->define_theme_scripts();
    }

    protected function define_theme_styles(){
        wp_enqueue_style($this->plugin_name.'rect_light_css',dirname(plugin_dir_url(__FILE__)) . '/css/theme_rect_light.css', array(), false, 'all');
    }
    protected function define_theme_scripts(){
        wp_enqueue_script($this->plugin_name.'rect_light_js',dirname(plugin_dir_url(__FILE__)) . '/js/theme_rect_light.js', array(), false, 'all');
    }

    public function ays_generate_quiz($attr)
    {
        $id = (isset($attr['id'])) ? absint(intval($attr['id'])) : null;
        $quiz = $this->get_quiz_by_id($id);
        $randomize_answers = false;
        $questions = null;
        $form_inputs = null;
        $show_form = null;
        $options = json_decode($quiz['options'], true);
        $arr_questions = ($quiz["question_ids"] == "") ? array() : explode(',', $quiz["question_ids"]);

        if (isset($options['randomize_questions']) && $options['randomize_questions'] == 'on') {
            shuffle($arr_questions);
        }
        if (isset($options['enable_question_bank']) && $options['enable_question_bank'] == 'on' && isset($options['questions_count']) && intval($options['questions_count']) > 0 && $options['questions_count'] <= count($arr_questions)) {
            $random_questions = array_rand($arr_questions, intval($options['questions_count']));
            foreach ($random_questions as $key => $question) {
                $random_questions[$key] = strval($arr_questions[$question]);
            }
            $arr_questions = $random_questions;
            $quiz_questions_ids = join(',', $random_questions);
        }
        $questions_count = count($arr_questions);

        $required_fields = ($options['required_fields'] != null)?$options['required_fields']:array();

        $name_required = (in_array('ays_user_name',$required_fields))?'required':'';
        $email_required = (in_array('ays_user_email',$required_fields))?'required':'';
        $phone_required = (in_array('ays_user_phone',$required_fields))?'required':'';

        if($options['form_name'] != null){
            $show_form = "show";
            $form_inputs .= "<input type='text' name='ays_user_name' placeholder='".__('Name', $this->plugin_name)."' class='ays_quiz_form_input' " . $name_required . ">";
        }else{
            $form_inputs .= "<input type='hidden' name='ays_user_name' placeholder='".__('Name', $this->plugin_name)."' value=''>";
        }
        if($options['form_email'] != null){
            $show_form = "show";
            $form_inputs .= "<input type='text' name='ays_user_email' placeholder='".__('Email', $this->plugin_name)."' class='ays_quiz_form_input' " . $email_required . ">";
        }else{
            $form_inputs .= "<input type='hidden' name='ays_user_email' placeholder='".__('Email', $this->plugin_name)."' value=''>";
        }
        if($options['form_phone'] != null){
            $show_form = "show";
            // $form_inputs .= "<input type='text' name='ays_user_phone' placeholder='".__('Phone Number', $this->plugin_name)."' class='ays_quiz_form_input' " . $phone_required . ">";
            $form_inputs .= "<input type='text' name='ays_user_phone' placeholder='".__('Your postcode (eg: 3191)', $this->plugin_name)."' class='ays_quiz_form_input' " . $phone_required . ">";
        }else{
            // $form_inputs .= "<input type='hidden' name='ays_user_phone' placeholder='".__('Phone Number', $this->plugin_name)."' value=''>";
            $form_inputs .= "<input type='hidden' name='ays_user_phone' placeholder='".__('Your postcode (eg: 3191)', $this->plugin_name)."' value=''>";
        }
        foreach ($arr_questions as $key => $question_id) {
            if (count($arr_questions) == ($key + 1)) {
                $questions .= $this->get_questions_by_id(absint(intval($question_id)), $questions_count, ($key + 1), true, $options, false, $id);
            } else {
                $questions .= $this->get_questions_by_id(absint(intval($question_id)), $questions_count, ($key + 1), false, $options, false, $id);
            }
        }

        if($show_form != null){
            if ($options['information_form'] == "after") {
                $questions = $questions . "<div class='step'>
                                    <div class='ays-abs-fs information_form'>
                                    " . $form_inputs . "
                                        <input type='submit' name='ays_finish_quiz' class='ays_finish action-button' value='".__('See Result ',$this->plugin_name)."'/>
                                    </div>
                                  </div>";

            } elseif ($options['information_form'] == "before") {
                $questions = "<div class='step'>
                                    <div class='ays-abs-fs information_form'>
                                        " . $form_inputs . "
                                       <input type='button' name='next' class='ays_next action-button' value='".__('Next',$this->plugin_name)."' />
                                    </div>
                                  </div>" . $questions;

            }
        }else{
            $options['information_form'] = "disable";
        }

        if (isset($options['enable_timer']) && $options['enable_timer'] == 'on') {
            $timer_text = (isset($options['timer_text'])) ? $options['timer_text'] : '';
            $timer_text = stripslashes(str_replace('%%time%%', $this->secondsToWords($options['timer']), wpautop($timer_text)));
            $timer_row = "<section style='width:100%;' class='ays_quiz_timer_container'><div class='ays-quiz-timer' data-timer='" . $options['timer'] . "'>{$timer_text}</div><hr></section>";
        } else {
            $timer_row = '';
        }
        $options['enable_box_shadow'] = (!isset($options['enable_box_shadow'])) ? 'on' : $options['enable_box_shadow'];
        $answer_view_class = (isset($options['answers_view']) && $options['answers_view'] != '') ? $options['answers_view'] : '';
        $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        $title = stripslashes($quiz['title']);
        $correction_id = (isset($options['enable_correction']) && $options['enable_correction'] == "on") ? "enable_correction" : "";
        $description = wpautop(stripslashes($quiz['description']));
        $quiz_image = $quiz['quiz_image'];
        $progress_bar = (isset($options['enable_progress_bar']) && $options['enable_progress_bar'] == 'on') ? "<div class='ays-bar-wrap'><span class='ays-bar-fill' style='width: 0%;'></span></div>" : "";
        $live_progress_bar_percent = (isset($options['enable_live_progress_bar']) && $options['enable_live_progress_bar'] == 'on' && isset($options['enable_percent_view']) && $options['enable_percent_view'] == 'on') ? "<span class='ays-live-bar-percent'>0</span>%" : "<span class='ays-live-bar-percent ays-live-bar-count'></span>/$questions_count";
        
        $live_progress_bar = (isset($options['enable_live_progress_bar']) && $options['enable_live_progress_bar'] == 'on') ? "<div class='ays-live-bar-wrap'><div class='ays-live-bar-fill' style='width: 0%;'><span>$live_progress_bar_percent</span></div></div>" : "";
        $bg_color = (isset($options['bg_color']) && $options['bg_color'] != '') ? $options['bg_color'] : "#fff";
        $color = (isset($options['color']) && $options['color'] != '') ? $options['color'] : "#27ae60";
        $text_color = (isset($options['text_color']) && $options['text_color'] != '') ? $options['text_color'] : "#333";
        $box_shadow_color = (isset($options['box_shadow_color']) && $options['box_shadow_color'] != '') ? $options['box_shadow_color'] : "#333";
        $form_height = (isset($options['height']) && $options['height'] != '') ? $options['height'] : "600";
        $quiz_width = (isset($options['width']) && $options['width'] != '') ? $options['width'] . 'px' : "100%";
        $quiz_border_radius = (isset($options['quiz_border_radius']) && $options['quiz_border_radius'] != '') ? $options['quiz_border_radius'] : "3";
        $quiz_modified_border_radius = "";
        $enable_questions_result = (isset($options['enable_questions_result']) && $options['enable_questions_result'] == 'on') ? 'enable_questions_result' : "";
        
        $enable_pass_count = (isset($options['enable_pass_count']) && $options['enable_pass_count'] == 'on') ? true : false;
        $enable_quiz_rate = (isset($options['enable_quiz_rate']) && $options['enable_quiz_rate'] == 'on') ? true : false;
        $enable_rate_avg = (isset($options['enable_rate_avg']) && $options['enable_rate_avg'] == 'on') ? true : false;
        $enable_rate_comments = (isset($options['enable_rate_comments']) && $options['enable_rate_comments'] == 'on') ? true : false;
        $enable_box_shadow = (isset($options['enable_box_shadow']) && $options['enable_box_shadow'] == 'on') ? true : false;
        
        $ays_social_buttons_class = (isset($options['enable_social_buttons']) && $options['enable_social_buttons'] == 'on') ? true : false;
        $ays_quiz_bg_image = (isset($options['quiz_bg_image']) && $options['quiz_bg_image'] != '') ? $options['quiz_bg_image'] : null;
        $enable_restart_button = (isset($options['enable_restart_button']) && $options['enable_restart_button'] != '') ? true : false;
        
        $enable_border = (isset($options['enable_border']) && $options['enable_border'] == 'on') ? true : false;
        $quiz_border_width = (isset($options['quiz_border_width']) && $options['quiz_border_width'] != '') ? $options['quiz_border_width'] : '1';
        $quiz_border_style = (isset($options['quiz_border_style']) && $options['quiz_border_style'] != '') ? $options['quiz_border_style'] : 'solid';
        $quiz_border_color = (isset($options['quiz_border_color']) && $options['quiz_border_color'] != '') ? $options['quiz_border_color'] : '#000';
        
        $quiz_loader = (isset($options['quiz_loader']) && $options['quiz_loader'] != '') ? $options['quiz_loader'] : 'default';
        
        if(isset($options['enable_logged_users']) && $options['enable_logged_users'] == 'on' && !is_user_logged_in()){
            $enable_logged_users = 'only_logged_users';
            $logged_users_message = isset($options['enable_logged_users_message']) ? $options['enable_logged_users_message'] : null;
            if($logged_users_message !== null){
                $user_massage = '<div class="logged_in_message">' . stripslashes(wpautop($logged_users_message)) . '</div>';
            }else{
                $user_massage = null;
            }
        }else{
            $user_massage = null;
            $enable_logged_users = '';
            if (isset($options['enable_restriction_pass']) && $options['enable_restriction_pass'] == 'on') {
                $user = wp_get_current_user();
                $message = (isset($options['restriction_pass_message']) && $options['restriction_pass_message'] != '') ? $options['restriction_pass_message'] : __('Permission Denied', $this->plugin_name);
                $user_role = (isset($options['user_role']) && $options['user_role'] != '') ? $options['user_role'] : '';
                if (in_array(strtolower($user_role), (array)$user->roles)) {
                    $user_massage = null;
                }else{                
                    $user_massage = '<div class="logged_in_message">' . stripslashes(wpautop($message)) . '</div>';
                }
            }
        }
        if($questions_count == 0){
            $empty_questions_notification = '<p style="color:red">' . __('You need to add questions', $this->plugin_name) . '</p>';
            $empty_questions_button = "disabled";
        }else{
            $empty_questions_notification = "";
            $empty_questions_button = "";
        }
        $button = "<input type='button' $empty_questions_button name='next' class='ays_next start_button action-button' value='".__('Start',$this->plugin_name)."' />";
        $show_average = "";
        if (isset($options['enable_average_statistical']) && $options['enable_average_statistical'] == "on") {
            global $wpdb;
            $sql = "SELECT AVG(`score`) FROM {$wpdb->prefix}aysquiz_reports WHERE quiz_id= $id";
            $result = round($wpdb->get_var($sql));
            $show_average = "<p class='ays_average'>" . __('Average statistical: ', $this->plugin_name) . $result . "%</p>";
        }
        $show_score = (isset($options['hide_score']) && $options['hide_score'] == 'on') ? false : true;
        $rate_form_title = (isset($options['rate_form_title'])) ? stripslashes(wpautop($options['rate_form_title'])) : '';
        $quiz_rates_avg = round($this->ays_get_average_of_rates($id), 1);
        $quiz_rates_count = $this->ays_get_count_of_rates($id);
        if($enable_quiz_rate){
            $quiz_rate_html = "<div class='ays_quiz_rete'>
                <div>$rate_form_title</div>
                <div class='for_quiz_rate ui huge star rating' data-rating='0' data-max-rating='5'></div>
                <div><div class='lds-spinner-none'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
                <div class='for_quiz_rate_reason'>
                    <textarea id='quiz_rate_reason_".$id."' class='quiz_rate_reason'></textarea>
                    <div class='ays_feedback_button_div'>
                        <button type='button' class='action-button'>". __('Send feedback', $this->plugin_name) ."</button>
                    </div>
                </div>
                <div><div class='lds-spinner2-none'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
                <div class='quiz_rate_reasons_body'></div>
            </div>";
        }else{
            $quiz_rate_html = '';
        }
        if($enable_rate_avg){
            $quiz_rate_reports = "<div class='ays_quiz_rete_avg'>
                <div class='for_quiz_rate_avg ui star rating' data-rating='".intval(round($quiz_rates_avg))."' data-max-rating='5'></div>
                <span>$quiz_rates_count votes, $quiz_rates_avg avg</span>
            </div>";
            $quiz_modified_border_radius = "border-radius:" . $quiz_border_radius . "px " . $quiz_border_radius . "px " . $quiz_border_radius . "px 0px;";
        }else{
            $quiz_rate_reports = '';
        }
        switch($quiz_loader){
            case 'default':
                $quiz_loader_html = "<div data-class='lds-ellipsis' data-role='loader' class='ays-loader'><div></div><div></div><div></div><div></div></div>";
                break;
            case 'circle':
                $quiz_loader_html = "<div data-class='lds-circle' data-role='loader' class='ays-loader'></div>";
                break;
            case 'dual_ring':
                $quiz_loader_html = "<div data-class='lds-dual-ring' data-role='loader' class='ays-loader'></div>";
                break;
            case 'facebook':
                $quiz_loader_html = "<div data-class='lds-facebook' data-role='loader' class='ays-loader'><div></div><div></div><div></div></div>";
                break;
            case 'hourglass':
                $quiz_loader_html = "<div data-class='lds-hourglass' data-role='loader' class='ays-loader'></div>";
                break;
            case 'ripple':
                $quiz_loader_html = "<div data-class='lds-ripple' data-role='loader' class='ays-loader'><div></div><div></div></div>";
                break;
            default:
                $quiz_loader_html = "<div data-class='lds-ellipsis' data-role='loader' class='ays-loader'><div></div><div></div><div></div><div></div></div>";
                break;
        }
        $main_content = "{$timer_row}
                                <div class='step active-step'>
                                    <div class='ays-abs-fs'>
                                        <img src='{$quiz_image}' alt='' class='ays_quiz_image'>
                                        <p class='ays-fs-title'>" . stripslashes($title) . "</p>
                                        <div class='ays-fs-subtitle'>{$description}</div>
                                        <input type='hidden' name='ays_quiz_id' value='{$id}'/>
                                        " . (isset($quiz_questions_ids) ? "<input type='hidden' name='ays_quiz_questions' value={$quiz_questions_ids}'>" : "") . "
                                        {$button}
                                        {$empty_questions_notification}
                                        </div>
                                </div>
                                {$questions}
                                <div class='step ays_thank_you_fs'>
                                    <div class='ays-abs-fs'>";
        
            $main_content .= $quiz_loader_html;
            $main_content .= "<div class='ays_quiz_results_page'>
                                    <div class='ays_message'></div>";
            if($show_score){
                $main_content .= "<p class='ays_score ays_score_display_none animated'>" .__('Your score is',$this->plugin_name).":</p>";
            }
            $main_content .= $show_average;        
            if($ays_social_buttons_class){
                  $main_content .= "<div class='ays-quiz-social-shares disable_social_buttons'>
                            <!-- Branded LinkedIn button -->
                            <a class='ays-share-btn ays-share-btn-branded ays-share-btn-linkedin'
                               href='https://www.linkedin.com/shareArticle?mini=true&url=" . $actual_link . "'
                               title='Share on LinkedIn'>
                                <span class='ays-share-btn-icon'></span>
                                <span class='ays-share-btn-text'>LinkedIn</span>
                            </a>

                            <!-- Branded Facebook button -->
                            <a class='ays-share-btn ays-share-btn-branded ays-share-btn-facebook'
                               href='https://www.facebook.com/sharer/sharer.php?u=" . $actual_link . "'
                               title='Share on Facebook'>
                                <span class='ays-share-btn-icon'></span>
                                <span class='ays-share-btn-text'>Facebook</span>
                            </a>    
                            <!-- Branded Google+ button -->
                            <a class='ays-share-btn ays-share-btn-branded ays-share-btn-googleplus'
                               href='https://plus.google.com/share?url=" . $actual_link . "'
                               title='Share on Google+'>
                                <span class='ays-share-btn-icon'></span>
                                <span class='ays-share-btn-text'>Google+</span>
                            </a>
                        </div>";
            }
            $main_content .= $progress_bar . $quiz_rate_html;
            if(!isset($options['limit_users']) || (isset($options['limit_users']) && $options['limit_users'] != "on")){
                if($enable_restart_button){
                    $main_content .= "<p class='ays_restart_button_p'>
                        <button type='button' class='action-button ays_restart_button'>
                            <i class='ays_fa ays_fa_undo'></i>
                            <span>".__("Restart quiz")."</span>
                        </button>
                    </p>";
                }
            }
                $main_content .= "</div>
                            </div>
                        </div>";
        if (isset($options['limit_users']) && $options['limit_users'] == "on") {
            global $wpdb;
            $user_ip = $this->get_user_ip();
            $sql = "SELECT COUNT(*) FROM `{$wpdb->prefix}aysquiz_reports` WHERE `user_ip` = '$user_ip' AND `quiz_id` = $id";
            $result = $wpdb->get_var($sql);
            if ($result != 0) {
                $timer_row = (isset($options['redirection_delay']) && $options['redirection_delay'] != '' && isset($options['redirect_url']) && $options['redirect_url'] != '')
                    ? "<p id='ays_redirect_url' style='display:none'>" . $options['redirect_url'] . "</p><div class='ays-quiz-timer' data-timer='" . $options['redirection_delay'] . "'>" . __('Redirecting after', $this->plugin_name) . " " . $this->secondsToWords($options['redirection_delay']) . "<EXTERNAL_FRAGMENT></EXTERNAL_FRAGMENT></div>"
                    : '';
                $main_content = $timer_row . "<div style='color:" . $color . "' class='ays_block_content'>" . stripslashes(wpautop($options['limitation_message'])) . "</div><style>form{min-height:0 !important;}</style>";
            }
        }
        $rtl_style = (isset($options['enable_rtl_direction']) && $options['enable_rtl_direction'] == "on")
            ? "
                        #ays-quiz-container-" . $id . " p {
                            direction:rtl;
                            text-align:right;   
                        }
                        #ays-quiz-container-" . $id . " p.ays_score {
                            text-align: center;   
                        }
                        #ays-quiz-container-" . $id . " p.ays-question-counter {
                            right: unset;
                            left: 8px;
                        }
                        #ays-quiz-container-" . $id . " .ays_question_hint {
                            left:unset;
                            right:10px;
                        }
                        #ays-quiz-container-" . $id . " .ays_question_hint_text {
                            left:unset;
                            right:20px;
                            margin-right: 10px;
                        }
                        #ays-quiz-container-" . $id . " .select2-container--default .select2-results__option {
                            direction:rtl;
                            text-align:right;
                        }
                        #ays-quiz-container-" . $id . " .select2-container--default .select2-selection--single .select2-selection__placeholder,
                        #ays-quiz-container-" . $id . " .select2-container--default .select2-selection--single .select2-selection__rendered {
                            direction:rtl;
                            text-align:right;
                            display: inline-block;
                            width: 95%;
                        }
                        #ays-quiz-container-" . $id . " .ays-field.ays-select-field {
                            margin: 0;
                        }
                        
                        #ays-quiz-container-" . $id . " label[for^=\"ays-answer-\"]{
                            direction:rtl;
                            text-align:right;
                            padding-left: 0px;
                            padding-right: 5px;
                            padding-bottom: 5px;
                            position: relative;
                            text-overflow: ellipsis;
                        }
                        #ays-quiz-container-" . $id . " label[for^=\"ays-answer-\"]::before {
                            margin-left: 5px;
                            margin-right: 0px;
                        }
                        #ays-quiz-container-" . $id . " label[for^=\"ays-answer-\"]::after {
                            margin-left: 0px;
                            margin-right: 10px;
                        }
                        "
            : "";
        $useragent = htmlentities($_SERVER['HTTP_USER_AGENT'], ENT_QUOTES, 'UTF-8');
        $display = (preg_match('~MSIE|Internet Explorer~i', $useragent) || (strpos($useragent, 'Trident/7.0; rv:11.0') !== false)) ? 'display:flex;flex-wrap:wrap;' : '';
        if($enable_pass_count){
            $quiz_result_reports = $this->get_quiz_results_count_by_id($id);
            $quiz_result_reports = "<span class='ays_quizn_ancnoxneri_qanak'><i class='ays_fa ays_fa_users'></i> ".$quiz_result_reports['res_count']."</span>";
            $quiz_modified_border_radius = "border-radius:" . $quiz_border_radius . "px " . $quiz_border_radius . "px 0px " . $quiz_border_radius . "px;";
        }else{
            $quiz_result_reports = '';
        }
        if($enable_rate_avg && $enable_pass_count){
            $quiz_modified_border_radius = "border-radius:" . $quiz_border_radius . "px " . $quiz_border_radius . "px 0px 0px;";
            $ays_quiz_reports = "<div class='ays_quiz_reports'>$quiz_rate_reports $quiz_result_reports</div>";
        }else{
            $ays_quiz_reports = $quiz_rate_reports.$quiz_result_reports;
        }
        if($user_massage !== null){
            $main_content = $user_massage;
        }
        $container = "<div class='ays-quiz-container ays_quiz_rect_light' id='ays-quiz-container-" . $id . "'>
                        {$live_progress_bar}
                        <div class='ays-questions-container'>
                            $ays_quiz_reports
                            <form action='' method='post' id='ays_finish_quiz_" . $id . "' class='" . $correction_id . " " . $enable_questions_result . " " . $enable_logged_users . "'>
                                <input type='hidden' value='" . $answer_view_class . "' class='answer_view_class'>
                                {$main_content}
                                 <style>
                                    #ays-quiz-container-" . $id . " #ays_finish_quiz_" . $id . " .ays-field input:checked+label:before {
                                        border-color: " . $color . ";
                                        background: " . $color . ";
	                                    background-clip: content-box;
                                    }
                                    #ays-quiz-container-" . $id . " #ays_finish_quiz_" . $id . "{
                                      " . $display . "
                                    }
                                    #ays-quiz-container-" . $id . " p,#ays-quiz-container-" . $id . " .action-button{
                                      color:" . $text_color . "
                                    }
                                    #ays-quiz-container-" . $id . " #ays_finish_quiz_" . $id . " .ays-field .select2-container--default .select2-selection--single {
                                        border-bottom: 2px solid " . $color . ";
                                    }
                                    #ays-quiz-container-" . $id . "{
                                        min-height: " . $form_height . "px;
                                        width:" . $quiz_width . ";
                                        background-color:" . $bg_color . ";";
        
                    if($ays_quiz_bg_image != null){
                        $container .=  "background-image: url('$ays_quiz_bg_image');";
                    }

                    if($quiz_modified_border_radius != ""){
                        $container .= $quiz_modified_border_radius;
                    }else{
                        $container .=  "border-radius:" . $quiz_border_radius . "px;";
                    }
        
                    if($enable_box_shadow){
                        $container .=  "box-shadow: 0 0 15px 1px " . $this->hex2rgba($box_shadow_color, '0.4') . ";";
                    }else{
                        $container .=  "box-shadow: none;";
                    }
                    if($enable_border){
                        $container .=  "border-width: " . $quiz_border_width.'px;'.
                                       "border-style: " . $quiz_border_style.';'.
                                       "border-color: " . $quiz_border_color.';';
                    }else{
                        $container .=  "border: none;";
                    }

                     $container .= "}";
                    if($display != ''){
                     $container .= "#ays-quiz-container-" . $id . " .ays_next.action-button,
                                    #ays-quiz-container-" . $id . " .ays_previous.action-button{
                                        margin: 10px 5px;
                                    }";
                    }
                     $container .= "#ays-quiz-container-" . $id . " #ays_finish_quiz_" . $id . " div.step{
                                        min-height: " . $form_height . "px;
                                    }
                                    #ays-quiz-container-" . $id . " #ays_finish_quiz_" . $id . " .action-button {
                                        background: " . $color . ";
                                    }
                                    #ays-quiz-container-" . $id . " #ays_finish_quiz_" . $id . " .action-button:hover,
                                    #ays-quiz-container-" . $id . " #ays_finish_quiz_" . $id . " .action-button:focus {
                                        box-shadow: 0 0 0 2px $text_color !important;
                                        background: " . $color . ";
                                    }
                                    #ays-quiz-container-" . $id . " .ays_question_hint .ays_question_hint_text {
                                        background-color:" . $bg_color . ";
                                        box-shadow: 0 0 15px 3px " . $this->hex2rgba($box_shadow_color, '0.6') . ";
                                    }
                                    #ays-quiz-container-" . $id . " .ays_question_hint{
                                        color:" . $text_color . ";
                                    }
                                    #ays-quiz-container-" . $id . " .ays_quizn_ancnoxneri_qanak,
                                    #ays-quiz-container-" . $id . " .ays_quiz_rete_avg{
                                        color:" . $bg_color . ";
                                        background-color:" . $text_color . ";                                        
                                    }
                                    #ays-quiz-container-" . $id . " .ays_quiz_rete_avg div.for_quiz_rate_avg.ui.star.rating .icon {
                                        color: " . $this->hex2rgba($bg_color, '0.5') . ";
                                    }
                                    #ays-quiz-container-" . $id . " #ays_finish_quiz_" . $id . " .ays-bar-wrap {
                                        background-color: " . $this->hex2rgba($text_color, '0.2') . ";
                                        border: 1px solid " . $this->hex2rgba($text_color, '0.8') . ";
                                    }
                                    #ays-quiz-container-" . $id . " .lds-circle,
                                    #ays-quiz-container-" . $id . " .lds-facebook div,
                                    #ays-quiz-container-" . $id . " .lds-ellipsis div{
                                        background: " . $text_color . ";
                                    }
                                    #ays-quiz-container-" . $id . " .lds-ripple div{
                                        border-color: " . $text_color . ";
                                    }
                                    #ays-quiz-container-" . $id . " .lds-dual-ring::after,
                                    #ays-quiz-container-" . $id . " .lds-hourglass::after{
                                        border-color: " . $text_color . " transparent " . $text_color . " transparent;
                                    }
                                    #ays-quiz-container-" . $id . " label[for^=\"ays-answer-\"],
                                    #ays-quiz-container-" . $id . " p,
                                    #ays-quiz-container-" . $id . " .ays-fs-title,
                                    #ays-quiz-container-" . $id . " .ays-fs-subtitle,
                                    #ays-quiz-container-" . $id . " .ays_message{
                                       color: " . $text_color . ";
                                    }
                                    .wrong_answer_text{
                                        color:#ff4d4d;
                                    }
                                    .right_answer_text{
                                        color:#33cc33;
                                    }
                                    #ays-quiz-container-" . $id . " .ays-bar-fill {
                                        background-color: " . $text_color . ";
                                    }
                                    .logged_in_message{
                                        color:" . $color . ";
                                    }
                                    #ays-quiz-container-" . $id . " .ays-quiz-answers .ays-field:hover{
                                        opacity: 1;
                                    }
                                    #ays-quiz-container-" . $id . " .ays-answer-image{
                                        width:" . (isset($options['answers_view']) && ($options['answers_view'] == "grid") ? "90%" : "50%") . ";
                                    }
                                 
                                    #ays-quiz-container-" . $id . " .ays-live-bar-fill{
                                        color: " . $text_color . ";
                                        border-bottom: 2px solid " . $this->hex2rgba($text_color, '0.8') . ";
                                        text-shadow: 0px 0px 5px " . $bg_color . ";
                                    }
                                    #ays-quiz-container-" . $id . " .ays-live-bar-percent{
                                        display:none;
                                    }
                                    #ays-quiz-container-".$id.".ays_quiz_rect_light .ays-quiz-answers .ays-field:hover {
                                        background: " . $this->hex2rgba($color, '0.3') . ";
                                    }
                                    #ays-quiz-container-".$id." .ays_arrow{
                                        color:". $text_color ."!important;
                                    }
                                    
                                    #ays-quiz-container-".$id.".ays_quiz_rect_light .checked_answer_div{
                                        background: ".$color.";
                                    }
                                    #ays-quiz-container-".$id." .ays-field {
                                        border:1px solid " . $text_color . ";
                                    }
                                    #ays-quiz-container-" . $id . " div.ays-quiz-timer{
                                        color: " . $text_color . ";
                                    }
                                    #ays-quiz-container-" . $id . " div.for_quiz_rate.ui.star.rating .icon {
                                        color: " . $this->hex2rgba($text_color, '0.35') . ";
                                    }
                                    #ays-quiz-container-" . $id . " div.lds-spinner {
                                        color: " . $text_color . ";
                                    }
                                    #ays-quiz-container-" . $id . " div.lds-spinner div:after {
                                        background-color: " . $text_color . ";
                                    }
                                    #ays-quiz-container-" . $id . " .ays_quiz_rete .for_quiz_rate_reason textarea.quiz_rate_reason {
                                        background-color: " . $text_color . ";
                                        color: " . $bg_color . ";
                                    }
                                    " . $options['custom_css'] . "" . $rtl_style . "
                                </style>
                                <input type='hidden' name='quiz_id' value='" . $id . "'/>
                                <input type='hidden' name='start_date' class='ays-start-date'/>
                                " . wp_nonce_field('ays_finish_quiz', 'ays_finish_quiz') . "

                            </form>
                        </div>
                    </div>
                    <script>";
        if (isset($options['limit_users']) && $options['limit_users'] == "on") {
            global $wpdb;
            $user_ip = $this->get_user_ip();
            $sql = "SELECT COUNT(*) FROM `{$wpdb->prefix}aysquiz_reports` WHERE `user_ip` = '$user_ip' AND `quiz_id` = $id";
            $result = $wpdb->get_var($sql);
            if ($result == 0) {
                $container .= "if(typeof options === 'undefined'){
                                    var options = [];
                                }
                                options.push('" . base64_encode(json_encode($options)) . "');";
            }
        }else{            
            $container .= "if(typeof options === 'undefined'){
                                var options = [];
                            }
                            options.push('" . base64_encode(json_encode($options)) . "');";
        }
        $container .= "(function($){
                            $(document).ready(function(){
                                $(document).find('#ays-quiz-container-" . $id . " select.ays-select').select2({
                                    placeholder: '".__( 'Select an answer', $this->plugin_name )."',
                                    dropdownParent: $('#ays-quiz-container-" . $id . "')
                                });                            
                                $(document).find('b[role=\"presentation\"]').addClass('ays_fa ays_fa_chevron_down');
                            });
                        })(jQuery);
                    </script>";
        return $container;
    }

    public function get_questions_by_id($id, $total, $current, $last, $options, $per_page, $quiz_id)
    {
        global $wpdb;
        $sql = "SELECT *
                FROM {$wpdb->prefix}aysquiz_questions
                WHERE id = " . $id;

        $question = $wpdb->get_row($sql, 'ARRAY_A');
        $container = null;
        if (!empty($question)) {
            $answers = $this->get_answers_with_question_id($question["id"]);
            $question_image = '';
            $question_image_style = '';
            if(isset($options['image_width']) && $options['image_width'] != '' && $options['height'] !== 0){
                $question_image_width = $options['image_width'] . 'px';
            }else{
                $question_image_width = "100%";
            }
            if(isset($options['image_height']) && $options['image_height'] != '' && $options['height'] !== 0){
                $question_image_height = $options['image_height'] . 'px';
            }else{
                $question_image_height = "auto";
            }
            $question_image_style = "style='width: $question_image_width; height: $question_image_height'";
            if ($question['question_image'] != NULL) {
                $question_image = '<div class="ays-image-question-img"><img src="' . $question['question_image'] . '" alt="Question Image" ' . $question_image_style . '></div>';
            }
            $answer_container = null;
            $question_hint = '';
            if (isset($options['randomize_answers']) && $options['randomize_answers'] == 'on') {
                shuffle($answers);
            }
            if (isset($question['question_hint']) && strlen($question['question_hint']) !== 0) {
                $question_hint = "<i class=\"ays_fa ays_fa_info_circle ays_question_hint\" aria-hidden=\"true\"><span class='ays_question_hint_text'>" . stripslashes(wpautop($question['question_hint'])) . "</span></i>";
            }

            $answer_view_class = (isset($options['answers_view']) && $options['answers_view'] != '') ? $options['answers_view'] : '';
            switch ($question["type"]) {
                case "select":
                    $answer_container .= "<div class='ays-field ays-select-field'><select class='ays-select'><option value=''>".__('Select an answer', $this->plugin_name)."</option>";
                    foreach ($answers as $answer) {
                        $answer_container .= "<option data-chisht='{$answer["correct"]}' value='{$answer["id"]}'>".do_shortcode(stripslashes($answer["answer"]))."</option>";
                    }
                    $answer_container .= "</select>";
                    $answer_container .= "<input class='ays-select-field-value' type='hidden' name='ays_questions[ays-question-{$question["id"]}]' value=''/>";
                    
                            foreach ($answers as $answer) {
                                $answer_container .= "<input type='hidden' name='ays_answer_correct[]' value='{$answer["correct"]}'/>";
                            }
                        
                    $answer_container .= "</div>";
                    break;
                case "text":
                    $enable_correction = (isset($options['enable_correction']) && $options['enable_correction'] == "on") ? "display:inline-block;white-space: nowrap;" : "display:none";
                    $enable_correction_textarea = (isset($options['enable_correction']) && $options['enable_correction'] == "on") ? "width:80%;" : "width:100%;";
                    $answer_container .= "<div class='ays-field ays-text-field ays_" . $answer_view_class . "_view_item'>";
                        foreach ($answers as $answer) {
                            $answer_image = (isset($answer['image']) && $answer['image'] != '') ? $answer["image"] : "";
                            $answer_container .= "<textarea style='$enable_correction_textarea' type='text' class='ays-text-input' name='ays_questions[ays-question-{$question["id"]}]'></textarea>
                            <input type='hidden' name='ays_answer_correct[]' value='0'/>
                            <button type='button' style='$enable_correction' class='ays_check_answer action-button'>".(__('Check', $this->plugin_name))."</button>";
                        }
                    
                        foreach ($answers as $answer) {
                            $answer_container .= "<script>
                                    if(typeof window.quizOptions_$quiz_id === 'undefined'){
                                        window.quizOptions_$quiz_id = [];
                                    }
                                    window.quizOptions_$quiz_id.push('" . base64_encode(json_encode(array(
                                        'question_type' => $question["type"],
                                        'question_answer' => $answer["answer"]
                                    ))) . "');
                                </script>";
                        }
                        
                    $answer_container .= "</div>";
                    break;
                default:
                    foreach ($answers as $answer) {
                        $answer_image = (isset($answer['image']) && $answer['image'] != '') ? "<img src='{$answer["image"]}' alt='answer_image' class='ays-answer-image'>" : "";
                        $answer_container .= "
                        <div class='ays-field'>
                            <input type='hidden' name='ays_answer_correct[]' value='{$answer["correct"]}'/>

                            <input type='{$question["type"]}' name='ays_questions[ays-question-{$question["id"]}]' id='ays-answer-{$answer["id"]}-{$quiz_id}' value='{$answer["id"]}'/>
                            
                            <label for='ays-answer-{$answer["id"]}-{$quiz_id}'>".do_shortcode(stripslashes($answer["answer"]))."</label>
                            <label for='ays-answer-{$answer["id"]}-{$quiz_id}'>{$answer_image}</label>

                            
                        </div>";

                    }
                    break;
            }

            if(isset($options['enable_questions_counter']) && $options['enable_questions_counter'] != ''){
                $questions_counter = "<p class='ays-question-counter animated'>{$current} / {$total}</p>";
            }else{
                $questions_counter = "";
            }
            if($last){
                if($options['information_form'] == "disable"){
                    $input = "<i class=\" ".((isset($options['enable_arrows'])&& $options['enable_arrows'] == "on")?'':'ays_display_none')." ays_fa ays_fa_flag_checkered ays_finish action-button ays_arrow\"></i><input type='submit' name='ays_finish_quiz' class=' ".((isset($options['enable_arrows'])&& $options['enable_arrows'] == "on")?'ays_display_none':'')." ays_finish action-button' value='".__('See Result ',$this->plugin_name)."'/>";
                }
                elseif($options['information_form']=="before"){
                    $input = "<i class=\" ".((isset($options['enable_arrows'])&& $options['enable_arrows'] == "on")?'':'ays_display_none')." ays_fa ays_fa_flag_checkered ays_finish action-button ays_arrow\"></i><input type='submit' name='ays_finish_quiz' class=' ".((isset($options['enable_arrows'])&& $options['enable_arrows'] == "on")?'ays_display_none':'')." ays_finish action-button' value='".__('See Result ',$this->plugin_name)."'/>";
                }
                else{
                    $input = "<i class=\" ".((isset($options['enable_arrows'])&& $options['enable_arrows'] == "on")?'':'ays_display_none')." ays_fa ays_fa_flag_checkered ays_finish action-button ays_arrow\"></i><input type='button' name='next' class=' ".((isset($options['enable_arrows'])&& $options['enable_arrows'] == "on")?'ays_display_none':'')." ays_next action-button' value='".__('Finish ',$this->plugin_name)."' />";
                }
                $container= "<div class='step' data-question-id='".$question["id"]."'>
                                ".$question_hint."
                                $questions_counter
                                <div class='ays-abs-fs'>
                                    <p>".do_shortcode(wpautop(stripslashes($question["question"])))."</p>
                                    {$question_image}
                                    <div class='ays-quiz-answers'>{$answer_container}</div>
                                                                        <div class='ays_buttons_div'>

                                        <i class=\"ays_fa ays_fa_arrow_left ays_previous action-button ays_arrow ".((isset($options['enable_previous_button']) && $options['enable_previous_button']=="on" && isset($options['enable_arrows'])&& $options['enable_arrows'] == "on")?'':'ays_display_none')."\"></i><input type='button' name='next' class='ays_previous action-button ".((isset($options['enable_previous_button']) && $options['enable_previous_button']=="on" && !isset($options['enable_arrows'])&& $options['enable_arrows'] !== "on")?'':'ays_display_none' )."' value='".__('Prev',$this->plugin_name)."' />

                                   ".$input."
                                   </div>
                                   <p class='wrong_answer_text' style='display:none'>". stripslashes($question["wrong_answer_text"]) . "</p>
                                   <p class='right_answer_text' style='display:none'>". stripslashes($question["right_answer_text"]) . "</p>
                                </div>
                              </div>";
            }
            else
                $container= "<div class='step' data-question-id='".$question["id"]."'>
                
                                ".$question_hint."
                                $questions_counter
                                <div class='ays-abs-fs'>
                                    <p>".do_shortcode(wpautop(stripslashes($question["question"])))."</p>
                                    {$question_image}
                                    <div class='ays-quiz-answers'>{$answer_container}</div>
                                    <div class='ays_buttons_div'>
                                        <i class=\"ays_fa ays_fa_arrow_left ays_previous action-button ays_arrow ".((isset($options['enable_previous_button']) && $options['enable_previous_button']=="on" && isset($options['enable_arrows'])&& $options['enable_arrows'] == "on")?'':'ays_display_none')."\"></i>
                                        <input type='button' name='next' class='ays_previous action-button ".((isset($options['enable_previous_button']) && $options['enable_previous_button']=="on" && !isset($options['enable_arrows'])&& $options['enable_arrows'] !== "on")?'':'ays_display_none' )."' value='".__('Prev',$this->plugin_name)."' />
                                        <i class=\"ays_fa ays_fa_arrow_right ays_next action-button ays_arrow ays_next_arrow ".(((isset($options['enable_next_button']) && $options['enable_next_button']=="on" && isset($options['enable_arrows'])&& $options['enable_arrows'] == "on"))?'':'ays_display_none')."\"></i>
                                        <input type='button' name='next' class='ays_next action-button ".(((array_key_exists('enable_next_button',$options) && $options['enable_next_button']=="on" && array_key_exists('enable_arrows',$options)&& $options['enable_arrows'] !== "on")|| (!array_key_exists('enable_next_button',$options)) || !(array_key_exists('enable_next_button',$options) && $options['enable_next_button'] != 'on') && (array_key_exists('enable_arrows',$options)&& $options['enable_arrows'] !== "on"))?'':'ays_display_none')."' value='".__('Next',$this->plugin_name)."' />
                                    </div>
                                    <p class='wrong_answer_text' style='display: none'>". stripslashes($question["wrong_answer_text"]) . "</p>
                                    <p class='right_answer_text' style='display: none'>". stripslashes($question["right_answer_text"]) . "</p>
                                </div>
                              </div>";

        }

        return $container;
    }



}

?>