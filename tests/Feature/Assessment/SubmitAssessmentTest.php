<?php

namespace Tests\Feature\Assessment;

use App\Models\AssessmentType;
use App\Models\Question;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SubmitAssessmentTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_submit_scs_assessment_and_last_assessment_at_is_saved(): void
    {
        $this->seed(DatabaseSeeder::class);

        $user = User::where('email', 'admin@selflove.com')->firstOrFail();
        $this->assertNotNull($user->email_verified_at);
        $this->assertNull($user->last_assessment_at);

        $type = AssessmentType::where('code', 'SCS')->firstOrFail();

        $answers = [];
        foreach (Question::where('assessment_type_id', $type->id)->where('is_active', true)->with('options')->get() as $question) {
            $answers[$question->id] = $question->options->first()->id;
        }

        $response = $this->actingAs($user)->post(route('assessments.submit', 'SCS'), [
            'answers' => $answers,
        ]);

        $response->assertStatus(200);

        $user->refresh();
        $this->assertNotNull($user->last_assessment_at, 'last_assessment_at should be stored after submit');
        $this->assertSame(1, $user->assessments()->where('status', 'completed')->count());
    }
}
