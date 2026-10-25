<?php

namespace App\Models;

use App\Support\ScoreLevel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAssessment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'assessment_type_id',
        'started_at',
        'completed_at',
        'total_score',
        'final_result',
        'status',
    ];

    protected $casts = [
        'started_at'   => 'datetime',
        'completed_at' => 'datetime',
    ];

    protected $appends = [
        'result_label',
    ];

    /*
    |--------------------------------------------------------------------------
    | Result Label
    |--------------------------------------------------------------------------
    |
    | Kata hasil akhir assessment. Lebih baik dihitung ulang daripada
    | dibaca dari kolom final_result, karena kolom itu bisa masih
    | menyimpan kata dari versi aturan range yang lama.
    |
    */

    public function getResultLabelAttribute(): ?string
    {
        if ($this->assessmentType?->scoring_type === 'dominant_tag') {
            return $this->results->first()?->value;
        }

        if ((float) $this->total_score > 0) {
            return ScoreLevel::label(
                (float) $this->total_score,
                $this->assessmentType?->code
            );
        }

        return $this->final_result;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function assessmentType()
    {
        return $this->belongsTo(AssessmentType::class);
    }

    public function answers()
    {
        return $this->hasMany(AssessmentAnswer::class);
    }

    public function results()
    {
         return $this->hasMany(AssessmentResult::class);
    }
}