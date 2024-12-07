export class HealthAndSafetyProviderFactor {
    has_procedure_for_recording_incidents: string;
    has_health_and_safety_policy: string;
    does_provides_health_and_safety_training: string;

    constructor(has_procedure_for_recording_incidents: string,
        has_health_and_safety_policy: string,
        does_provides_health_and_safety_training: string) {

        this.has_procedure_for_recording_incidents = has_procedure_for_recording_incidents;
        this.has_health_and_safety_policy = has_health_and_safety_policy;
        this.does_provides_health_and_safety_training = does_provides_health_and_safety_training;
    }
}