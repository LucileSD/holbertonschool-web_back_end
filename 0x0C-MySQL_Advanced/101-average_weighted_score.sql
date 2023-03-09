-- creates a stored procedure ComputeAverageWeightedScoreForUsers
-- that computes and store the average weighted score for all students.
DROP PROCEDURE IF EXISTS ComputeAverageWeightedScoreForUsers;
DELIMITER //
CREATE PROCEDURE ComputeAverageWeightedScoreForUsers()
BEGIN
	UPDATE users
	SET average_score = (SELECT SUM(p.weight * c.score) / SUM(p.weight)
						 FROM projects AS p
						 INNER JOIN corrections AS c
						 ON p.id = c.project_id WHERE users.id = c.user_id);
END;
//
DELIMITER ;
