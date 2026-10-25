<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

   protected $fillable = [
    'assessment_type_id',
    'category_id',
    'question_code',
    'question',
    'question_order',
    'answer_type',
    'is_reverse',
    'is_required',
    'is_active',
];

    protected $casts = [
        'is_reverse' => 'boolean',
        'is_required' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(AssessmentCategory::class, 'category_id');
    }

    public function options()
    {
        return $this->hasMany(QuestionOption::class);
    }

    public function answers()
    {
        return $this->hasMany(AssessmentAnswer::class);
    }
    public function assessmentType()
{
    return $this->belongsTo(
        AssessmentType::class,
        'assessment_type_id'
    );
}
}