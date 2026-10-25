<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\AssessmentCategory;
use Illuminate\Database\Eloquent\SoftDeletes;

class AssessmentType extends Model
{
    use HasFactory, SoftDeletes;


    protected $fillable = [
        'name',
        'code',
        'description',
        'source',
        'purpose',
        'instructions',
        'thumbnail',
        'estimated_time',
        'status',
        'scoring_type'
    ];


    public function categories()
    {
        return $this->belongsToMany(
            AssessmentCategory::class,
            'assessment_category_type'
        );
    }


    public function questions(): HasMany
    {
        return $this->hasMany(Question::class, 'assessment_type_id');
    }


    public function contents(): HasMany
{
    return $this->hasMany(Content::class);
}


    public function userAssessments()
    {
        return $this->hasMany(UserAssessment::class);
    }
}