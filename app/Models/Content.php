<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Content extends Model
{
    use HasFactory;

  protected $fillable = [
    'assessment_type_id',
    'category_id',
    'title',
    'slug',
    'excerpt',
    'source',
    'type',
    'thumbnail',
    'content',
    'media_url',
    'estimated_time',
    'tag',
    'difficulty',
    'status',
    'is_featured',
];

    public function tags(): BelongsToMany
{
    return $this->belongsToMany(
        Tag::class,
        'content_tag'
    );
}

    public function category()
    {
        return $this->belongsTo(AssessmentCategory::class);
    }

    public function userContents()
    {
        return $this->hasMany(UserContent::class);
    }
    public function assessmentType()
{
    return $this->belongsTo(
        AssessmentType::class,
        'assessment_type_id'
    );
}

}
