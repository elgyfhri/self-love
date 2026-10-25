<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssessmentAnswer extends Model
{
    use HasFactory;


    protected $fillable = [
        'user_assessment_id',
        'question_id',
        'question_option_id',
        'answer_text',
    ];


    public function userAssessment()
    {
        return $this->belongsTo(
            UserAssessment::class
        );
    }


    public function question()
    {
        return $this->belongsTo(
            Question::class
        );
    }


    public function questionOption()
    {
        return $this->belongsTo(
            QuestionOption::class
        );
    }
}