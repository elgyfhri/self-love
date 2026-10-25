<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssessmentCategory extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'indonesian_name',
        'abbreviation',
        'description',
    ];

    protected $appends = [
        'label',
    ];

    /*
    |--------------------------------------------------------------------------
    | Label
    |--------------------------------------------------------------------------
    |
    | Nama kategori ditampilkan dua bahasa, dipisahkan garis miring:
    | "Self Kindness / Kebaikan pada Diri Sendiri"
    |
    */

    public function getLabelAttribute(): string
    {
        if (empty($this->indonesian_name)) {
            return (string) $this->name;
        }

        return $this->name . ' / ' . $this->indonesian_name;
    }

    

   public function assessmentTypes()
{
    return $this->belongsToMany(
        AssessmentType::class,
        'assessment_category_type'
    );
}

    public function questions()
    {
        return $this->hasMany(Question::class, 'category_id');
    }

   public function contents()
{
    return $this->hasMany(Content::class);
}
}